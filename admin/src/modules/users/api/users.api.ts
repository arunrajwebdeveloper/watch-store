import { Axios } from "../../../utils";

export const getUsers = async () => {
  const res = await Axios.get("/users");
  return res.data;
};

export const getUserById = async (userId: string | undefined) => {
  const res = await Axios.get(`/users/${userId}`);
  return res.data;
};
