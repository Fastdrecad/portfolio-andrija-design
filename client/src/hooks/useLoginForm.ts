import { useEffect, useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: ""
  });

  const [isFormValidState, setIsFormValidState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validacija email-a
  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email.trim());
  };

  // Validacija password-a
  const isPasswordValid = (password: string) => {
    return password.trim().length >= 6;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Provera validnosti forme pri svakoj promeni
  useEffect(() => {
    const isValid =
      isEmailValid(values.email) && isPasswordValid(values.password);
    setIsFormValidState(isValid);
  }, [values]);

  return {
    values,
    setValues,
    handleChange,
    isFormValidState,
    loading,
    setLoading,
    error,
    setError
  };
};

export default useLoginForm;
