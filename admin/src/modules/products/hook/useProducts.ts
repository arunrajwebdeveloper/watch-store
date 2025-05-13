import { useQuery, useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { getProducts, getProductById, createProducts } from "../api";
import { useImmer } from "use-immer";
import { useForm, useFieldArray } from "react-hook-form";

type CreateState = {
  brand: string;
  model: string;
  originalPrice: number | null;
  currentPrice: number | null;
  weight: number | null;
  color: string;
  size: string;
  movementType: string;
  gender: string;
  images: { url: string }[];
  inventory: number | null;
};

const defaultValues = {
  brand: "",
  model: "",
  originalPrice: null,
  currentPrice: null,
  weight: null,
  color: "",
  size: "",
  movementType: "",
  gender: "",
  images: [{ url: "" }],
  inventory: null,
};

export const useProducts = ({ load = false, productId = "" }) => {
  // const navigate = useNavigate();

  const { register, watch, handleSubmit, formState, control } =
    useForm<CreateState>({
      defaultValues,
    });

  const fieldArray = useFieldArray<CreateState>({
    control,
    name: "images",
  });

  const [page, setPage] = useImmer({
    limit: 10,
    pageNumber: 1,
    lastPage: 1,
  });

  const createProduct = useMutation({
    mutationFn: (data) => createProducts(data),
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
    onSettled: () => {},
  });

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

  return {
    createProduct,
    fetchProducts,
    fetchProductsById,
    page,
    formState,
    fieldArray,
    setPage,
    register,
    watch,
    handleSubmit,
  };
};
