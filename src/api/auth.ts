
import api, { url } from "./axios";
import type { UserProfile } from "@/types/types";

export const register = async (
  payload: Omit<UserProfile, 'id'>,
): Promise<{ message: string; success: boolean }> => {


  // return { success: false, message: "No response" };
  try {
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

    sessionStorage.setItem("user_data", JSON.stringify(user));

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
};
export const getMe = () => api.get("/auth/me");


