import api from "./axios";

export const register = (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => api.post("/auth/register", payload);

export const login = (payload: { email: string; password: string }) => {
  api.post("/auth/login", payload).then((res) => {
    const { user } = res.data;
    // sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem(
      "user_data",
      JSON.stringify({
        username: user.name,
        email: user.email,
        role: user.role,
      }),
    );
  });
};

export const getMe = () => api.get("/auth/me");

export const logout = () => {
  api.post("/auth/logout");
  sessionStorage.removeItem("user_data");
  return;
};
