import { Axios } from "../../../utils";

export const getOrders = async (status: string) => {
  const res = await Axios.get(`/orders/all/${status}`);
  return res.data;
};
