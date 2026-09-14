import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import type { UserProfile } from "../types/types";
import { useAuthStore } from "@/store/store";
import { secureFetch } from "@/api/axios";

export const useRegister = () => {
  const { login, url } = useAuth();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<undefined | boolean>(undefined);

  const registerUser = async (
    payload: Omit<UserProfile, 'id' | 'status' | 'isEmailVerified' | 'profileImageUrl' | 'createdAt'>,
  ): Promise<{ message: string; success: boolean }> => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        credentials: "include",
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
      const { user, accessToken } = resData.data;

      if (response.status === 200) {
        login(user, accessToken);
        setAuth(user, accessToken);
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


export const useLogin = () => {
  const { login, url } = useAuth();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<undefined | boolean>(undefined);

  const loginUser = async (payload: {
    email: string;
    password: string;
  }): Promise<{ message: string; success: boolean }> => {
    try {

      setLoading(true);
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Fetch doesn't throw an error on 404/500, so we check response.ok

      if (response.status === 401) {
        return { success: false, message: "Invalid Credentials" };
      }

      if (!response.ok) {
        return { success: false, message: "Fetch threw an error " };
      }
      const resData = await response.json();
      const { user, accessToken } = resData.data;

      if (response.status === 200) {
        login(user, accessToken);
        setAuth(user, accessToken)
      }

      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Login Error:", error);
      setError("An unexpected error occurred")
      return { success: false, message: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};




export const useRefresh = () => {
  const { url, setAccessToken } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState<undefined | boolean>(undefined);

  const refresh = async (): Promise<{ message: string; success: boolean }> => {
    try {
      const response = await fetch(`${url}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

        })
      })

      const resData = await response.json();


      if (!response.ok) {
        return { success: false, message: "Failed to fetch" };
      }
      console.log(resData.data)
      setAccessToken(resData.data.accessToken)
      setAuth(resData.data.user, resData.data.accessToken)

      return { success: true, message: "Refresh successful" };
    } catch (err) {
      setError("Failed to fetch")
      console.log(err)
      return { success: false, message: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, refresh }
}


export const useLogout = () => {

  const { logout: handleLogout } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const [error, setError] = useState<null | string>(null)

  const logout = async (): Promise<{ success: boolean, message: string }> => {
    try {
      const response = await secureFetch(`/auth/logout`, { method: "POST" })

      if (!response.ok) {
        return { success: false, message: "Failed to logout" }
      }

      const data = await response.json()


      clearAuth()
      handleLogout()
      return { success: data.data, message: data.message }

    } catch (error) {
      console.log(error)
      setError("An unexpected error occurred")
      return { success: false, message: "An unexpected error occurred" }

    } finally {
      setLoading(false)
    }
  }
  return { loading, error, logout }
}