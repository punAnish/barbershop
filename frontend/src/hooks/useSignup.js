// import { useState } from "react";

// export const useSignup = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);

//   const signup = async () => {};

//   return { signup, isLoading, error };
// };

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password, passwordAgain) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!name || !email || !password || !passwordAgain) {
        throw new Error("All fields must be filled");
      }

      if (password !== passwordAgain) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch("api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, passwordAgain }),
      });

      // Check if the response has a JSON content-type header
      if (
        !response.ok ||
        !response.headers.get("content-type")?.includes("application/json")
      ) {
        throw new Error("Signup failed. Please check your input.");
      }

      const json = await response.json();

      if (!response.ok) {
        if (json && json.error) {
          throw new Error(json.error);
        } else {
          throw new Error("Signup failed. Please check your input.");
        }
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
