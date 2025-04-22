import axios from "axios";
import { API_BASE_URL } from "@/constants";
// import { store } from "@/store";
// import { startLoading, stopLoading } from "@/store/slices/loadingSlice";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: send cookies
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 🔄  request
// api.interceptors.request.use(
//   (config) => {
//     // Dispatch startLoading before each request if no requests are currently in progress
//     if (!store.getState().loading.isLoading) {
//       store.dispatch(startLoading());
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    // store.dispatch(stopLoading());
    return response;
  },
  async (error) => {
    // store.dispatch(stopLoading());
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/auth/logout")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest._retry = true;
              resolve(api(originalRequest));
            },
            reject: (err: any) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh");
        processQueue(null, null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
