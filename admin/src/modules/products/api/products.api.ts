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
