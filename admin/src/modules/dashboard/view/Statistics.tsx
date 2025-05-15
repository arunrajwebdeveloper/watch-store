import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hook";
import { PageLayout } from "../../../layouts";
import StatisticsCard from "../components/StatisticsCard";

export const Statistics = () => {
  const { fetchStatistics } = useDashboard({ load: true });
  const { data, isError } = fetchStatistics;
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (isError) return <span>An error occured.</span>;

  return (
    <PageLayout title="Dashboard">
      <div className="stat-boxes">
        <StatisticsCard
          title="Products"
          value={data?.productCount}
          onClick={() => handleNavigate("/u/products")}
        />
        <StatisticsCard
          title="Users"
          value={data?.userCount}
          onClick={() => handleNavigate("/u/users")}
        />
        <StatisticsCard
          title="Orders"
          value={data?.orderCount}
          onClick={() => handleNavigate("/u/orders")}
        />
      </div>
    </PageLayout>
  );
};
