import axios from "axios";
import { getRefreshToken } from "../master";

// Create an Axios instance with the base URL and credentials flag
export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/", // API base URL from environment variables
  headers: {
    "Content-Type": "application/json", // JSON content type for requests
  },
  withCredentials: true, // Important to send cookies (access + refresh tokens) with each request
});

let isRefreshing = false;
let requestsQueue: any[] = []; // Queue for pending requests that will be retried after refreshing the token

// Interceptor for handling 401 Unauthorized errors and retrying requests after refreshing the token
Axios.interceptors.response.use(
  (response) => response, // If the request is successful, return the response
  async (error) => {
    const originalRequest = error.config; // The original request that failed

    // Handle 401 Unauthorized error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as having been retried

      // If the token is not refreshing already, start the process of refreshing the token
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Attempt to refresh the access token by calling the backend refresh token endpoint
          await refreshAccessToken();
          // Retry the original request after refreshing the token (cookies are automatically sent)
          return Axios(originalRequest);
        } catch (error) {
          // If refresh token fails, log out the user and redirect to the login page
          sessionTimeOutEvent();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue up the request to retry after the token has been refreshed
      return new Promise((resolve, reject) => {
        requestsQueue.push({
          resolve,
          reject,
          originalRequest,
        });
      });
    }

    return Promise.reject(error); // Reject the error for further handling
  }
);

// Function to refresh the access token by sending the refresh token to your backend
const refreshAccessToken = async () => {
  try {
    const response = await getRefreshToken(); // Call the backend refresh endpoint

    if (!response) {
      throw new Error("Failed to refresh access token");
    }

    // Access token is refreshed and stored automatically in the cookie
    // We don't need to manually update the authorization header here

    // After refreshing, retry all pending requests in the queue
    retryQueuedRequests();
  } catch (error) {
    sessionTimeOutEvent(); // If the refresh fails, log out the user and redirect
    throw error; // Propagate the error
  }
};

// Function to retry all the failed requests in the queue after the token has been refreshed
const retryQueuedRequests = () => {
  const pendingRequests = [...requestsQueue]; // Copy the queued requests to retry them
  requestsQueue = []; // Clear the queue after retrying

  // Retry each request in the queue
  pendingRequests.forEach(({ originalRequest: config, resolve, reject }) => {
    Axios.request(config)
      .then((response) => resolve(response)) // Resolve the request if it was successful
      .catch((err) => reject(err)); // Reject the request if there was an error
  });
};

// Function to handle session timeout: clears cookies and redirects to the login page
const sessionTimeOutEvent = () => {
  // Redirect the user to the login page
  window.location.href = "/account/login";
};
