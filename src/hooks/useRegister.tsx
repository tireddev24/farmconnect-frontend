import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import type { userRegister } from "../types/userType";

const useRegister = () => {
  const { login, url } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<undefined | boolean>(undefined);

  const registerUser = async (
    payload: userRegister,
  ): Promise<{ message: string; success: boolean }> => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${url}/auth/register`, {
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
      const { user } = resData.data;

      if (response.status === 200) {
        login(user);
      }

      return { success: true, message: "Registration successful" };
    } catch (error) {
      console.error("Registration Error:", error);
      return { success: false, message: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};

export default useRegister;
