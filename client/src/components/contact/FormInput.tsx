import { useState } from "react";

interface FormInputProps {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  errorMessage?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  focused?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const [isInFocus, setIsInFocus] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const {
    onChange,
    errorMessage,
    label,
    minLength,
    maxLength,
    type,
    id,
    pattern,
    ...inputProps
  } = props;

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

  const handleBlur = () => {
    setIsInFocus(true);
  };

  return (
    <div className="form-input__row">
      <label className="form-input__label">{label}</label>
      {type === "textarea" ? (
        <textarea
          className="form-input__input form-input__textarea"
          id={id.toString()}
          {...inputProps}
          onChange={handleInputChange}
          onBlur={handleBlur}
          data-focused={isInFocus.toString()}
          minLength={minLength}
          maxLength={maxLength}
        />
      ) : (
        <input
          className="form-input__input"
          id={id.toString()}
          type={type}
          {...inputProps}
          onChange={handleInputChange}
          onBlur={handleBlur}
          data-focused={isInFocus.toString()}
          pattern={pattern}
        />
      )}
      {!isValid && errorMessage && (
        <span className="form-input__error-message">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
