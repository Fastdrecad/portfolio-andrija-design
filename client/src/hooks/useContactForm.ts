import { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const useContactForm = () => {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const [isFormValidState, setIsFormValidState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    // Simple email validation and message length check
    const isFormValid = () => {
      return (
        values.firstName.trim() !== "" &&
        values.lastName.trim() !== "" &&
        /^\S+@\S+\.\S+$/.test(values.email.trim()) &&
        values.message.trim().length >= 10
      );
    };

    setIsFormValidState(isFormValid());
  };

  return {
    values,
    setValues,
    handleChange,
    isFormValidState,
    loading,
    setLoading,
    responseMessage,
    setResponseMessage
  };
};

export default useContactForm;
