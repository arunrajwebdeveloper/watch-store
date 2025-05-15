import { NavLink } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        to="/u/dashboard"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/u/orders"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        Orders
      </NavLink>
      <NavLink
        // end
        to="/u/users"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        Users
      </NavLink>
      <NavLink
        to="/u/products"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        Products
      </NavLink>
    </div>
  );
}
