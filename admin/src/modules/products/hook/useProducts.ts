import { useQuery, useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { getProducts, getProductById, createProducts } from "../api";
import { useImmer } from "use-immer";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

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
  createdAt?: "";
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
  const [product, setProduct] = useImmer<CreateState>(defaultValues);
  const { register, watch, handleSubmit, formState, control, reset } =
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
    onSuccess: () => {
      reset();
    },
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

  useEffect(() => {
    if (fetchProductsById?.data) {
      const { product } = fetchProductsById?.data;
      const formatted = {
        ...product,
        images: product?.images?.map((img: any) => {
          return { url: img };
        }),
      };

      setProduct(formatted);
    }
  }, [fetchProductsById?.data]);

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
    product,
    setProduct,
  };
};
