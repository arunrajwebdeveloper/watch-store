import { Axios } from "../../../utils";

export const getProducts = async (page: any) => {
  const res = await Axios.get(
    `/products?page=${page.pageNumber}&limit=${page.limit}`
  );
  return res.data;
};

export const getProductById = async (productId: string | undefined) => {
  const res = await Axios.get(`/products/${productId}`);
  return res.data;
};

export const createProducts = async (payload: any) => {
  const res = await Axios.post("/products", payload);
  return res.data;
};
export const updateProducts = async (payload: any, productId: string) => {
  const res = await Axios.patch(`/products/edit/${productId}`, payload);
  return res.data;
};
