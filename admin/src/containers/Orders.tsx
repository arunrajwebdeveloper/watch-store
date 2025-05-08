import { NavLink, Outlet } from "react-router-dom";

function Orders() {
  return (
    <div>
      <h2>Orders</h2>
      <div className="tab-btns">
        <NavLink
          to=""
          end // to prevent always highlighting
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          All
        </NavLink>
        <NavLink
          to="placed"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          Placed
        </NavLink>
        <NavLink
          to="delivered"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          Delivered
        </NavLink>
      </div>
      <div className="tab-wrap">
        <Outlet />
      </div>
    </div>
  );
}

export default Orders;
