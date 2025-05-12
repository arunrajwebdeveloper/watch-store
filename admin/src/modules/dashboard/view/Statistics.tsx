import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hook";

export const Statistics = () => {
  const { fetchStatistics } = useDashboard({ load: true });
  const { data, isError } = fetchStatistics;
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (isError) return <span>An error occured.</span>;

  return (
    <>
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>
      <div className="page-content">
        <div className="stat-boxes">
          <div
            className="stat-card"
            onClick={() => handleNavigate("/products")}
          >
            <div>
              <h3>Products</h3>
              <p>{data?.productCount}</p>
            </div>
          </div>
          <div className="stat-card" onClick={() => handleNavigate("/users")}>
            <div>
              <h3>Users</h3>
              <p>{data?.userCount}</p>
            </div>
          </div>
          <div className="stat-card" onClick={() => handleNavigate("/orders")}>
            <div>
              <h3>Orders</h3>
              <p>{data?.orderCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
