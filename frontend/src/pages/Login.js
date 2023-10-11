import { useLogin } from "../hooks/useLogin";
import useField from "../hooks/useField";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const emailInput = useField("");
  const passwordInput = useField("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access the values from emailInput and passwordInput
    await login(emailInput.value, passwordInput.value);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>
        <FaSignInAlt /> Log In
      </h3>

      <label>Email address:</label>
      <input type="email" {...emailInput} />
      <label>Password:</label>
      <input type="password" {...passwordInput} />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
