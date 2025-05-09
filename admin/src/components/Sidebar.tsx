import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        to="/"
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
        to="/user"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        User
      </NavLink>
    </div>
  );
}

export default Sidebar;
