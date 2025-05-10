import { Axios } from "../../../utils";

export const getStatistics = async () => {
  const res = await Axios.get("/dashboard/statistics");
  return res.data;
};
