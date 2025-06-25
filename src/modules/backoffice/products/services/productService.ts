import api from "../../../../core/api/axios";
import { CREATE_PRODUCT_ENDPOINT, DELETE_PRODUCT_ENDPOINT, GET_PRODUCT_ENDPOINT, GET_PRODUCTS_AVAILABLE_ENDPOINT, GET_PRODUCTS_ENDPOINT, UPDATE_PRODUCT_ENDPOINT } from "../../../../services/apiPaths";
import type { CreateProductForm, Product } from "../types/products.types";

export async function getProductsService(): Promise<Product[]> {
  const { data } = await api.get<Product[]>(GET_PRODUCTS_ENDPOINT);
  return data;
}

export async function getProductsServiceAvailable(): Promise<Product[]> {
  const { data } = await api.get<Product[]>(GET_PRODUCTS_AVAILABLE_ENDPOINT);
  return data;
}


export async function getProductService(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`${GET_PRODUCT_ENDPOINT(id)}`);
  return data;
}

export async function createProductService(
  payload: CreateProductForm
): Promise<Product> {
  const form = new FormData();
  form.append('image', payload.image);
  form.append('name', payload.name);
  form.append('description', payload.description || '');
  form.append('price', payload.price.toString());
  form.append('sku', payload.sku);
  form.append('inventory', payload.inventory.toString());

  const response = await api.post<Product>(CREATE_PRODUCT_ENDPOINT, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
} 

export async function updateProductService(
  id: number,
  payload: CreateProductForm
): Promise<Product> {
  const form = new FormData();
  if (payload.image) {
    form.append('image', payload.image);
  }
  form.append('name', payload.name);
  form.append('description', payload.description || '');
  form.append('price', payload.price.toString());
  form.append('sku', payload.sku);
  form.append('inventory', payload.inventory.toString());

  const response = await api.put<Product>(`${UPDATE_PRODUCT_ENDPOINT(id)}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function deleteProductService(id: number): Promise<void> {
  await api.delete(DELETE_PRODUCT_ENDPOINT(id));
}
