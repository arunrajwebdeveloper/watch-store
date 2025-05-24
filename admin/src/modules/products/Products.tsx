import { Route, Routes } from "react-router-dom";
import Product from "./view/Product";
import { ProductList } from "./view/ProductList";
import { Create } from "./view/Create";
import { Edit } from "./view/Edit";

export default function Products() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/:id" element={<Product />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}
