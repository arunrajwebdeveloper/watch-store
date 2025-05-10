import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./cookies";
import { getRefreshToken } from "../master";

const COOKIE_EXPIRY_DAYS = 1;

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const cookie = getCookie("watchstore__dashboard_user");
    const localData = cookie ? JSON.parse(cookie) : null;

    if (localData?.accessToken) {
      config.headers["Authorization"] = "Bearer " + localData?.accessToken;
    } else {
      config.headers["Authorization"] = null;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

let requestsQueue: any[] = [];
let isRefreshing: boolean = false;

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const token = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          await retryQueuedRequests();
          return await Axios(originalRequest);
        } catch (error) {
          sessionTimeOutEvent();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        requestsQueue.push({
          resolve,
          reject,
          originalRequest,
        });
      });
    }

    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const localCookie = getCookie("watchstore__dashboard_user");
    const localUser = localCookie ? JSON.parse(localCookie) : null;

    if (!localUser || !localUser?.refreshToken || !localUser?.accessToken) {
      sessionTimeOutEvent();
    }

    const tokenPayload = {
      refreshToken: localUser?.refreshToken,
    };

    const response = await getRefreshToken(tokenPayload);

    if (!response || !response?.accessToken || !response?.refreshToken) {
      sessionTimeOutEvent();
    }

    const updatedData = {
      ...localUser,
      accessToken: response?.accessToken,
      refreshToken: response?.refreshToken,
    };

    const isRemember = JSON.parse(
      localStorage.getItem("watchstore__dashboard_user__remember") ?? ""
    );

    if (isRemember) {
      setCookie(
        "watchstore__dashboard_user",
        JSON.stringify(updatedData),
        COOKIE_EXPIRY_DAYS
      );
    } else {
      setCookie("watchstore__dashboard_user", JSON.stringify(updatedData));
    }

    return response?.accessToken;
  } catch (error) {
    sessionTimeOutEvent();
    throw error;
  }
};

const retryQueuedRequests = async () => {
  const pendingRequests = [...requestsQueue];
  requestsQueue = [];

  pendingRequests.forEach(({ originalRequest: config, resolve, reject }) => {
    Axios.request(config)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

const sessionTimeOutEvent = () => {
  removeCookie("watchstore__dashboard_user");
  window.location.href = "/account/login";
};
