import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  getProductById,
  createProducts,
  updateProducts,
} from "../api";
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
  const navigate = useNavigate();

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

  const updateProduct = useMutation({
    mutationFn: (data) => updateProducts(data, productId),
    onSuccess: () => {
      navigate("/products");
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

      const images = product?.images?.map((img: any) => {
        return { url: img };
      });

      reset({
        brand: product?.brand,
        model: product?.model,
        originalPrice: product?.originalPrice,
        currentPrice: product?.currentPrice,
        weight: product?.weight,
        color: product?.color,
        size: product?.size,
        movementType: product?.movementType,
        gender: product?.gender,
        images,
        inventory: product?.inventory,
      });
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
    updateProduct,
  };
};
