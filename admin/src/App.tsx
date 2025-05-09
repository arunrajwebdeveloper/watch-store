import { Routes, Route } from "react-router-dom";
import Orders from "./containers/Orders";
import Users from "./containers/Users";
import Dashboard from "./containers/Dashboard";
import Sidebar from "./components/Sidebar";

const grops = [
  <Route index element={<h4>All orders</h4>} />,
  <Route path="placed" element={<h4>Placed</h4>} />,
  <Route path="delivered" element={<h4>Delivered</h4>} />,
];

function App() {
  return (
    <div className="main-wrap">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
