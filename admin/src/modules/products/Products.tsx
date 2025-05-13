import { Route, Routes } from "react-router-dom";
import Product from "./view/Product";
import { ProductList } from "./view/ProductList";
import { Create } from "./view/Create";

export default function Products() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList title="Products" />} />
        <Route path="/:id" element={<Product title="Product Details" />} />
        <Route path="/create" element={<Create title="Create Product" />} />
      </Routes>
    </div>
  );
}
