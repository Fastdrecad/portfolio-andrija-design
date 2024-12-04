import classNames from "classnames";
import React, { forwardRef, useState } from "react";

interface FormInputProps {
  id: string | number;
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  value: string;
  errorMessage?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  focused?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  className?: string;
}

const FormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormInputProps
>(
  (
    {
      id,
      name,
      type,
      placeholder,
      label,
      value,
      errorMessage,
      onChange,
      onBlur,
      required = false,
      minLength,
      maxLength,
      pattern,
      className,
      ...props
    },
    ref
  ) => {
    const [isInFocus, setIsInFocus] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (pattern) {
        const regex = new RegExp(pattern);
        setIsValid(regex.test(e.target.value));
      }

      const value = e.target.value;
      if (type === "textarea") {
        if (
          (minLength && value.length < minLength) ||
          (maxLength && value.length > maxLength)
        ) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      }
      onChange(e);
    };

    const handleBlur = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setIsInFocus(true);
      onBlur?.(e);
    };

    return (
      <div className={classNames("form-input__row", className)}>
        {label && (
          <label htmlFor={id.toString()} className="form-input__label">
            {label}
          </label>
        )}

        {type === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id.toString()}
            name={name}
            className={classNames("form-input__input", "form-input__textarea", {
              "form-input__input--error": !isValid && isInFocus
            })}
            value={value}
            placeholder={placeholder}
            onChange={handleInputChange}
            onBlur={handleBlur}
            data-focused={isInFocus.toString()}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            {...props}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={id.toString()}
            name={name}
            type={type}
            className={classNames("form-input__input", {
              "form-input__input--error": !isValid && isInFocus
            })}
            value={value}
            placeholder={placeholder}
            onChange={handleInputChange}
            onBlur={handleBlur}
            data-focused={isInFocus.toString()}
            pattern={pattern}
            required={required}
            {...props}
          />
        )}

        {!isValid && isInFocus && errorMessage && (
          <span className="form-input__error-message">{errorMessage}</span>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
