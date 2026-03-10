import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const useLogin = () => {
  const { login, url } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<undefined | boolean>(undefined);

  const loginUser = async (payload: {
    email: string;
    password: string;
  }): Promise<{ message: string; success: boolean }> => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Fetch doesn't throw an error on 404/500, so we check response.ok

      if (!response.ok) {
        return { success: false, message: "Fetch threw an error " };
      }

      const resData = await response.json();
      const { user, accessToken, refreshToken } = resData.data;

      if (response.status === 200) {
        login(user, accessToken, refreshToken);
      }

      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
