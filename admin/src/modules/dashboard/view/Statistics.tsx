import { useDashboard } from "../hook";

export const Statistics = () => {
  const { fetchStatistics } = useDashboard({ load: true });
  const { data, isError } = fetchStatistics;

  if (isError) return <span>An error occured.</span>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <div>
          <h3>Products</h3>
          <p>{data?.productCount}</p>
        </div>
        <div>
          <h3>Users</h3>
          <p>{data?.userCount}</p>
        </div>
        <div>
          <h3>Orders</h3>
          <p>{data?.orderCount}</p>
        </div>
      </div>
    </div>
  );
};
