import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../api";

export const useDashboard = ({ load = false }) => {
  const fetchStatistics = useQuery({
    queryKey: ["STATISTICS"],
    queryFn: getStatistics,
    enabled: load,
  });

  return { fetchStatistics };
};
