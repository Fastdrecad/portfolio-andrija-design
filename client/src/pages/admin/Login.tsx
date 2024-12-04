import { Button } from "@/components/common";
import FormInput from "@/components/common/FormInput";
import useLoginForm from "@/hooks/useLoginForm";
import { setCredentials } from "@/redux/authSlice";
import authService from "@/services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    values,
    handleChange,
    isFormValidState,
    loading,
    setLoading,
    error,
    setError
  } = useLoginForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValidState) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(values);
      dispatch(setCredentials(response));
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <h1>Admin Login</h1>

        <form onSubmit={onSubmit}>
          <FormInput
            id={1}
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            errorMessage="Please enter a valid email address"
          />
          <FormInput
            id={2}
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            errorMessage="Password must be at least 6 characters"
          />
          {error && <div className="error-message">{error}</div>}
          <Button
            variant="secondary"
            loading={loading}
            disabled={!isFormValidState}
            className="contact-form__btn-send"
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
