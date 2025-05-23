import { Axios } from "../../utils";

export const authenticate = async (payload: any) => {
  const res = await Axios.post("/auth/login", payload);
  return res.data;
};

export const createAccounts = async (payload: any) => {
  const res = await Axios.post("/users/register", payload);
  return res.data;
};

export const getRefreshToken = async () => {
  const res = await Axios.post("/auth/refresh");
  return res.data;
};

export const userLogout = async () => {
  const res = await Axios.post("/auth/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await Axios.get("/users/admin/me");
  return res.data;
};
