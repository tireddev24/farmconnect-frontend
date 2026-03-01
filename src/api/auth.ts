/* eslint-disable @typescript-eslint/no-explicit-any */
import api, { url } from "./axios";
import { type userRegister } from "../types/userType";

export const register = async (
  payload: userRegister,
): Promise<{ message: string; success: boolean }> => {
  console.log(payload);

  const isObjectComplete = (obj: Record<string, any>): boolean => {
    // .every returns true only if the condition is met for EVERY item

    return Object.values(obj).every((value) => {
      // Check for null, undefined, and empty strings
      if (value === null || value === undefined) return false;
      if (typeof value === "string" && value.trim() === "") return false;

      return true;
    });
  };

  if (!isObjectComplete(payload)) {
    return { success: false, message: "Please fill in all fields" };
  }
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

export const logout = () => {
  api.post("/auth/logout");
  sessionStorage.removeItem("user_data");
  return;
};
