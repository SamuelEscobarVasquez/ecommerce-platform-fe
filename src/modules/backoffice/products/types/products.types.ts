export interface CreateProductForm {
  name: string;
  description?: string;
  price: number;
  sku: string;
  inventory: number;
  image: File;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  sku: string;
  inventory: number;
  imageUrl: string;
}