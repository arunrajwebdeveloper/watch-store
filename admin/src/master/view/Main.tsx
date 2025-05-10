import { PageLayout } from "../../layouts";
import { Dashboard, Orders } from "../../modules";
import { Routes, Route } from "react-router-dom";

export const Main = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </PageLayout>
  );
};
