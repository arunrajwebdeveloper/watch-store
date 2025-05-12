import { NavLink } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        to="/dashboard"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        Orders
      </NavLink>
      <NavLink
        // end
        to="/users"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        Users
      </NavLink>
    </div>
  );
}
