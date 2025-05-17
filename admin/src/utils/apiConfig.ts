import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/",
  withCredentials: true, // send cookies (refresh token)
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("x__watch_dashboard_token");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return Axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await Axios.get("/auth/refresh");

        if (response.status === 400) {
          localStorage.removeItem("x__watch_dashboard_token");
          localStorage.removeItem("x__watch_dashboard_user");
          window.location.href = "/account/login";
        }

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("x__watch_dashboard_token", newAccessToken);

        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return Axios(originalRequest);
      } catch (err) {
        console.log("err :>> ", err);

        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
