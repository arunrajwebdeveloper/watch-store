import { Axios } from "../../../utils";

export const getOrders = async (status: string) => {
  const res = await Axios.get(`/orders/get/${status}`);
  return res.data;
};
