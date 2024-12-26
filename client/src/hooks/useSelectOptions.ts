import {
  MyRole,
  MyRoleType,
  PortfolioItemProps,
  Tags,
  Tools
} from "@/types/portfolioTypes";
import { useMemo } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export interface SelectOption<T = string> {
  value: T;
  label: string;
  isNew?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
}

type FieldName = "myRole" | "tags" | "toolsUsed";

type FieldValues = {
  myRole: MyRoleType[];
  tags: string[];
  toolsUsed: string[];
};

export const useSelectOptions = (
  setValue: UseFormSetValue<PortfolioItemProps>,
  getValues: UseFormGetValues<PortfolioItemProps>
) => {
  const enumToOptions = useMemo(
    () =>
      <T extends { [key: string]: string }>(enumObj: T): SelectOption[] =>
        Object.values(enumObj).map((value) => ({
          value,
          label: value
        })),
    []
  );

  const roleOptions = useMemo(
    () => Object.values(MyRole).map((value) => ({ value, label: value })),
    []
  );
  const tagOptions = useMemo(() => enumToOptions(Tags), [enumToOptions]);
  const toolOptions = useMemo(() => enumToOptions(Tools), [enumToOptions]);

  const validationRules = useMemo(
    () =>
      ({
        myRole: {
          pattern: /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
          message: "Role must be in Title Case with only letters and spaces",
          example: "Example: Product Designer"
        },
        tags: {
          pattern: /^[A-Z][a-zA-Z0-9]+(?: [A-Z][a-zA-Z0-9]+)*$/,
          message:
            "Tags must be in Title Case and can contain letters and numbers",
          example: "Example: React Development"
        },
        toolsUsed: {
          pattern: /^[A-Za-z0-9][\w\s.-]*$/,
          message:
            "Tools can contain letters, numbers, spaces, and common characters",
          example: "Example: React.js or Adobe XD"
        }
      } as const),
    []
  );

  const optionsMap = useMemo(
    () => ({
      myRole: roleOptions,
      tags: tagOptions,
      toolsUsed: toolOptions
    }),
    [roleOptions, tagOptions, toolOptions]
  );

  const checkDuplicate = (value: string, field: FieldName): boolean => {
    const currentValues = getValues(field) as FieldValues[typeof field];
    return currentValues?.some(
      (currentValue) => currentValue.toLowerCase() === value.toLowerCase()
    );
  };

  const validateNewOption = (
    inputValue: string,
    field: FieldName
  ): ValidationResult => {
    const value = inputValue.trim();

    if (!value) {
      return { isValid: false, message: "Value cannot be empty" };
    }

    if (value.length < 3) {
      return {
        isValid: false,
        message: "Value must be at least 3 characters long"
      };
    }

    if (checkDuplicate(value, field)) {
      return { isValid: false, message: "This value already exists" };
    }

    const rule = validationRules[field];
    if (!rule.pattern.test(value)) {
      return { isValid: false, message: `${rule.message}. ${rule.example}` };
    }

    return { isValid: true, message: "Valid input" };
  };

  const handleCreate = (
    inputValue: string,
    field: FieldName
  ): ValidationResult => {
    const validation = validateNewOption(inputValue, field);

    if (!validation.isValid) {
      return validation;
    }

    const newOption: SelectOption = {
      value: inputValue,
      label: inputValue,
      isNew: true
    };

    const currentValues = (getValues(field) || []) as string[];
    if (field === "myRole") {
      if (!Object.values(MyRole).includes(inputValue as MyRole)) {
        return {
          isValid: false,
          message: "Invalid role value"
        };
      }
    }
    setValue(field, [...currentValues, newOption.value]);

    return {
      isValid: true,
      message: "Option created successfully"
    };
  };

  const getOptionsForField = (field: FieldName): SelectOption[] => {
    return optionsMap[field] || [];
  };

  const formatOptionLabel = useMemo(
    () => (option: SelectOption) => {
      if (!option) return { label: "", value: "" };
      return {
        ...option,
        label: option.isNew ? `${option.label} (new)` : option.label
      };
    },
    []
  );

  return {
    roleOptions,
    tagOptions,
    toolOptions,
    handleCreate,
    getOptionsForField,
    formatOptionLabel,
    validateNewOption
  };
};
