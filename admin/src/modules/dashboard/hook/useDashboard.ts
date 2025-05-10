import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { getStatistics } from "../api";

export const useDashboard = ({ load = false }) => {
  // const navigate = useNavigate();

  const fetchStatistics = useQuery({
    queryKey: ["STATISTICS"],
    queryFn: getStatistics,
    enabled: load,
  });

  return { fetchStatistics };
};
