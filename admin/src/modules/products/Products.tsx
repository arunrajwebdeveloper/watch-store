import { Route, Routes } from "react-router-dom";
import Product from "./view/Product";
import { ProductList } from "./view/ProductList";

export default function Products() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList title="Products" />} />
        <Route path="/:id" element={<Product title="Product Details" />} />
      </Routes>
    </div>
  );
}
