import { Route, Routes } from "react-router-dom";
import { OrderPage } from "./view/OrderPage";

// const orderTabs = [
//   <Route index element={<h4>All orders</h4>} />,
//   <Route path="placed" element={<h4>Placed</h4>} />,
//   <Route path="delivered" element={<h4>Delivered</h4>} />,
// ];

export default function Orders() {
  return (
    <Routes>
      <Route path="/" element={<OrderPage />}>
        {/* {orderTabs} */}
        <Route index element={<h4>All orders</h4>} />
        <Route path="placed" element={<h4>Placed</h4>} />
        <Route path="delivered" element={<h4>Delivered</h4>} />
      </Route>
    </Routes>
  );
}
