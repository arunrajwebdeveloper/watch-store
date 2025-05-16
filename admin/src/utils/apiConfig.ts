import axios from "axios";
import { getRefreshToken } from "../master";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let requestsQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  originalRequest: any;
}[] = [];

const processQueue = (error: any = null) => {
  requestsQueue.forEach(({ resolve, reject, originalRequest }) => {
    if (error) {
      reject(error);
    } else {
      Axios(originalRequest).then(resolve).catch(reject);
    }
  });
  requestsQueue = [];
};

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 and avoid infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await getRefreshToken(); // Call refresh endpoint

          if (!response) {
            throw new Error("Refresh token failed");
          }

          processQueue(); // Retry all queued requests
          return Axios(originalRequest); // Retry original
        } catch (err) {
          processQueue(err); // Reject all queued requests
          sessionTimeOutEvent();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // Wait until the token refresh is done
      return new Promise((resolve, reject) => {
        requestsQueue.push({ resolve, reject, originalRequest });
      });
    }

    return Promise.reject(error);
  }
);

const sessionTimeOutEvent = () => {
  localStorage.removeItem("x__watch_dashboard_user");
  window.location.href = "/account/login";
};
