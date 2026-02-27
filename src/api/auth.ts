import api from "./axios";

export const register = (payload: {
  // name: string;
  firstname: string;
  lastname: string;
  email?: string;
  password: string;
  username?: string;
  role: string;
  nin: string;
  address: string;
}) => api.post("/auth/register", payload);

export const login = async (payload: {
  username: string;
  password: string;
}): Promise<{ message: string; success: boolean }> => {
  try {
    const response = await fetch("/auth/login", {
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

    sessionStorage.setItem(
      "user_data",
      JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      }),
    );

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
