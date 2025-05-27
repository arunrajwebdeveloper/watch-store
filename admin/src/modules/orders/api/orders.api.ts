import { Axios } from "../../../utils";

export const getOrders = async (status: string) => {
  const res = await Axios.get(`/orders/get/${status}`);
  return res.data;
};

export const getOrderDetails = async (orderId: string) => {
  const res = await Axios.get(`/orders/order-details/${orderId}`);
  return res.data;
};

export const updateStatus = async (orderId: string, payload: any) => {
  const res = await Axios.patch(`/orders/status/${orderId}`, payload);
  return res.data;
};
