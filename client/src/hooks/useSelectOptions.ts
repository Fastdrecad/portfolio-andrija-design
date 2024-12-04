import { MyRole, PortfolioItem, Tags, Tools } from "@/types/portfolioTypes";
import { useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export interface SelectOption<T> {
  value: T;
  label: string;
}

export const useSelectOptions = (
  setValue: UseFormSetValue<PortfolioItem>,
  getValues: UseFormGetValues<PortfolioItem>
) => {
  const [roleOptions, setRoleOptions] = useState<SelectOption<string>[]>(() =>
    Object.values(MyRole).map((role) => ({
      value: role,
      label: role
    }))
  );

  const [tagOptions, setTagOptions] = useState<SelectOption<string>[]>(() =>
    Object.values(Tags).map((tag) => ({
      value: tag,
      label: tag
    }))
  );

  const [toolOptions, setToolOptions] = useState<SelectOption<string>[]>(() =>
    Object.values(Tools).map((tool) => ({
      value: tool,
      label: tool
    }))
  );

  const handleCreate = (
    inputValue: string,
    selectType: "role" | "tag" | "tool"
  ) => {
    const newOption: SelectOption<string> = {
      value: inputValue,
      label: inputValue
    };

    switch (selectType) {
      case "role":
        setRoleOptions((prev) => [...prev, newOption]);
        setValue("myRole", [
          ...(getValues("myRole") || []),
          inputValue as
            | "Furniture Designer"
            | "3D Modeler"
            | "CAD Specialist"
            | "Product Designer"
            | "3D Artist"
        ]);
        break;
      case "tag":
        setTagOptions((prev) => [...prev, newOption]);
        setValue("tags", [...(getValues("tags") || []), inputValue]);
        break;
      case "tool":
        setToolOptions((prev) => [...prev, newOption]);
        setValue("toolsUsed", [...(getValues("toolsUsed") || []), inputValue]);
        break;
    }
  };

  return {
    roleOptions,
    tagOptions,
    toolOptions,
    handleCreate
  };
};
