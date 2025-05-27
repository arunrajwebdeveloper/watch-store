import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrders, getOrderDetails, updateStatus } from "../api";
import { useToast } from "../../../master/context/ToastScope";

export const useOrders = ({ load = false, status = "all", orderId = "" }) => {
  const { showSuccess, showError } = useToast();

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

  const updateOrderStatus = useMutation({
    mutationFn: (data: any) => updateStatus(orderId, data),
    onSuccess: () => {
      showSuccess("Order status updated successfully!");
    },
    onError: (error: any) => {
      showError(`Something went wrong: ${error?.message}`);
    },
  });

  return { fetchOrders, fetchOrderDetails, updateOrderStatus };
};
