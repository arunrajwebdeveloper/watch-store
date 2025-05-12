import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { getOrders } from "../api";

export const useOrders = ({ load = false, status = "all" }) => {
  // const navigate = useNavigate();

  const fetchOrders = useQuery({
    queryKey: ["ORDERS", status],
    queryFn: () => getOrders(status),
    enabled: load,
  });

  return { fetchOrders };
};
