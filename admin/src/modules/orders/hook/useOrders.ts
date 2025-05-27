import { useQuery } from "@tanstack/react-query";
import { getOrders, getOrderDetails } from "../api";

export const useOrders = ({ load = false, status = "all", orderId = "" }) => {
  const fetchOrders = useQuery({
    queryKey: ["ORDERS", status],
    queryFn: () => getOrders(status),
    enabled: load,
  });

  const fetchOrderDetails = useQuery({
    queryKey: ["ORDER_DETAILS", orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });

  return { fetchOrders, fetchOrderDetails };
};
