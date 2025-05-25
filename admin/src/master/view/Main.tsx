import { GlobalLayout } from "../../layouts/GlobalLayout";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./NotFound";

const Dashboard = lazy(() => import("../../modules/dashboard/Dashboard"));
const Orders = lazy(() => import("../../modules/orders/Orders"));
const Users = lazy(() => import("../../modules/users/Users"));
const Products = lazy(() => import("../../modules/products/Products"));

export const Main = () => {
  return (
    <Suspense fallback={<div className="main-loading">Loading...</div>}>
      <GlobalLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders/*" element={<Orders />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalLayout>
    </Suspense>
  );
};
