import { useSignup } from "../hooks/useSignup";
import useField from "../hooks/useField";
import { FaUser } from "react-icons/fa";

const Signup = () => {
  const nameInput = useField("");
  const emailInput = useField("");
  const passwordInput = useField("");

  const passwordAgainInput = useField("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access the values from nameInput, emailInput, and passwordInput, passwordAgainInput
    await signup(
      nameInput.value,
      emailInput.value,
      passwordInput.value,
      passwordAgainInput.value
    );
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>
        {" "}
        <FaUser />
        Sign Up
      </h3>
      <label>Name:</label>
      <input type="text" {...nameInput} />
      <label>Email address:</label>
      <input type="email" {...emailInput} />
      <label>Password:</label>
      <input type="password" {...passwordInput} />
      <label>Re-Enter Password:</label>
      <input type="password" {...passwordAgainInput} />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
