import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { getProducts, getProductById } from "../api";
import { useImmer } from "use-immer";

export const useProducts = ({ load = false, productId = "" }) => {
  // const navigate = useNavigate();

  const [page, setPage] = useImmer({
    limit: 10,
    pageNumber: 1,
    lastPage: 1,
  });

  console.log("page :>> ", page);

  const fetchProducts = useQuery({
    queryKey: ["PRODUCTS", page],
    queryFn: () => getProducts(page),
    enabled: load,
  });

  const fetchProductsById = useQuery({
    queryKey: ["PRODUCTS", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  return { fetchProducts, fetchProductsById, page, setPage };
};
