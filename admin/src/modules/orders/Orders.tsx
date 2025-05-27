import { Route, Routes } from "react-router-dom";
import { OrderPage } from "./view/OrderPage";
import { OrderList } from "./view/OrderList";
import Product from "./view/Order";

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
        <Route index element={<OrderList title="All Orders" status="all" />} />
        <Route
          path="placed"
          element={<OrderList title="Placed" status="placed" />}
        />
        <Route
          path="delivered"
          element={<OrderList title="Delivered" status="delivered" />}
        />
        <Route
          path="cancelled"
          element={<OrderList title="Cancelled" status="cancelled" />}
        />
        <Route
          path="processing"
          element={<OrderList title="Processing" status="processing" />}
        />
        <Route
          path="shipped"
          element={<OrderList title="Shipped" status="shipped" />}
        />
      </Route>
      <Route path=":orderId" element={<Product />} />
    </Routes>
  );
}
