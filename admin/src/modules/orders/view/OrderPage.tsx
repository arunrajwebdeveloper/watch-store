import { NavLink, Outlet } from "react-router-dom";

export const OrderPage = () => {
  return (
    <div>
      <h2>Orders</h2>
      <div className="tab-btns">
        <NavLink
          to="."
          end // to prevent always highlighting | orders/placed - will not highlight this path link, exact orders link only highlighted
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
          to="processing"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          Processing
        </NavLink>
        <NavLink
          to="shipped"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          Shipped
        </NavLink>
        <NavLink
          to="delivered"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          Delivered
        </NavLink>
        <NavLink
          to="cancelled"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          Cancelled
        </NavLink>
      </div>
      <div className="tab-wrap">
        <Outlet />
      </div>
    </div>
  );
};
