import api from "./axios";

export type SKU = {
  _id: string;
  model: string;
  price: string;
  numberInStock: string;
};

export type Product = {
  _id: string;
  name: string;
  attributes: { name: string; values: string[] }[];
  skus: string[];
  createdAt: string;
  updatedAt: string;
};

type ProductResponse = {
  items: Product[];
  page: number;
  perPage: number;
  total: number;
};

export const getProducts = async (page = 1, perPage = 10) => {
  const res = await api.get<ProductResponse>("/products", {
    params: { page, perPage },
  });
  return res.data;
};

export const createProduct = async (product: {
  name: string;
  attributes: { name: string; values: string[] }[];
  skusIds: string[];
}) => {
  const res = await api.post("/products", product);
  return res.data;
};

export const addProduct = async (product: Product) => {
  const res = await api.post("/products", product);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export const updateProduct = async (
  id: string,
  body: Partial<{
    name: string;
    attributes: { name: string; values: string[] }[];
    skusIds: string[];
  }>
) => {
  const res = await api.patch(`/products/${id}`, body);
  return res.data;
};

export const createSKU = async (sku: {
  model: string;
  price: string;
  numberInStock: string;
}): Promise<SKU> => {
  const res = await api.post("/skus", sku);
  return res.data;
};

export const getSKU = async (id: string): Promise<SKU> => {
  const res = await api.get(`/skus/${id}`);
  return res.data;
};

export const updateSKU = async (
  id: string,
  sku: Partial<SKU>
): Promise<SKU> => {
  const res = await api.patch(`/skus/${id}`, sku);
  return res.data;
};
