import axios from "axios";
import { useAuthStore } from '@/store/store';


export const url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});


// Request Interceptor: Automatically inject the in-memory bearer token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken; // Pull directly from Zustand memory
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catch 401s and execute silent refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    // Check if error is 401 Unauthorized and we haven't retried this request yet
    if (error?.response?.status === 401 && !prevRequest?._retry) {
      prevRequest._retry = true;

      try {
        // Hit the refresh endpoint (browser attaches HttpOnly cookie automatically)
        const response = await axios.post(
          `${url}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = response.data.data;

        // Update the Zustand store with the fresh in-memory token
        useAuthStore.getState().setAuth(user, accessToken);

        // Retry the original request with the new header
        prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(prevRequest);
      } catch (refreshError) {
        // If the refresh token is also expired or invalid, clear state & force logout
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;




export const secureFetch = async (path: string, options: RequestInit = {}) => {
  // 1. Ensure headers exist and merge credentials configuration


  const headers = new Headers(options.headers)

  options.credentials = 'include'; // Crucial: forces fetch to include HttpOnly cookies

  headers.set('Content-Type', 'application/json')

  console.log(options)
  // 2. Inject the in-memory access token if available
  const token = useAuthStore.getState().accessToken;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // 3. Make the initial request
  let response = await fetch(`${url}${path}`, { ...options, headers });

  // 4. Handle token expiration (401 Unauthorized)
  if (response.status === 401) {
    try {
      // Hit the backend endpoint to cycle tokens using the HttpOnly cookie
      const refreshResponse = await fetch(`${url}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include', // Crucial here as well
      });

      if (!refreshResponse.ok) throw new Error('Refresh token invalid');

      const data = await refreshResponse.json();

      const { user, accessToken } = data;

      // Update Zustand state with the fresh token
      useAuthStore.getState().setAuth(user, accessToken);

      // Retry the original request with the brand new access token
      headers.set('Authorization', `Bearer ${accessToken}`)
      response = await fetch(`${url}${path}`, { ...options, headers });

    } catch (refreshError) {
      console.error(refreshError)
      // If refresh fails, clear auth state to force a clean logout
      useAuthStore.getState().clearAuth();
      return response; // Return the original 401 response
    }
  }

  return response;
};
