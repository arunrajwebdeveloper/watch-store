import { Routes, Route, NavLink } from "react-router-dom";
import Orders from "./containers/Orders";
import Users from "./containers/Users";

const grops = [
  <Route index element={<h4>All orders</h4>} />,
  <Route path="placed" element={<h4>Placed</h4>} />,
  <Route path="delivered" element={<h4>Delivered</h4>} />,
];

function App() {
  return (
    <div className="main-wrap">
      <div className="sidebar">
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "active-link" : ""
          }
        >
          Tabs
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
      <div className="content">
        <Routes>
          <Route path="/" element={<h4>Dashboard</h4>} />
          <Route path="/orders" element={<Orders />}>
            {/* <Route index element={<h4>All orders</h4>} />
            <Route path="placed" element={<h4>Placed</h4>} />
            <Route path="delivered" element={<h4>Delivered</h4>} /> */}

            {/* OR */}

            {grops}
          </Route>
          <Route path="/user/*" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
