import { NavLink } from "react-router-dom";
import DashboardIcon from "./sidebar-icons/DashboardIcon";
import OrderIcon from "./sidebar-icons/OrderIcon";
import UserIcon from "./sidebar-icons/UserIcon";
import ProductIcon from "./sidebar-icons/ProductIcon";
import CouponIcon from "./sidebar-icons/CouponIcon";
import ReportIcon from "./sidebar-icons/ReportIcon";
import ReviewIcon from "./sidebar-icons/ReviewIcon";
import PaymentIcon from "./sidebar-icons/PaymentIcon";
import SettingsIcon from "./sidebar-icons/SettingsIcon";

export function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        to="/u/dashboard"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <DashboardIcon />
        </div>
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        to="/u/orders"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <OrderIcon />
        </div>
        <span>Orders</span>
      </NavLink>
      <NavLink
        // end
        to="/u/users"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <UserIcon />
        </div>
        <span>Users</span>
      </NavLink>
      <NavLink
        to="/u/products"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <ProductIcon />
        </div>
        <span>Products</span>
      </NavLink>
      <NavLink
        to="/u/payments"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <PaymentIcon />
        </div>
        <span>Payments</span>
      </NavLink>
      <NavLink
        to="/u/coupons"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <CouponIcon />
        </div>
        <span>Coupons</span>
      </NavLink>
      <NavLink
        to="/u/reviews"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <ReviewIcon />
        </div>
        <span>Reviews</span>
      </NavLink>
      <NavLink
        to="/u/reports"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <ReportIcon />
        </div>
        <span>Reports</span>
      </NavLink>
      <NavLink
        to="/u/settings"
        className={({ isActive }: { isActive: boolean }) =>
          isActive ? "active-link" : ""
        }
      >
        <div className="sidebar-icon">
          <SettingsIcon />
        </div>
        <span>Settings</span>
      </NavLink>
    </div>
  );
}
