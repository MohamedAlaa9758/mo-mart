import { Brand, Category } from "./allOrders";

export interface ListResponse {
  status: string;
  count: number;
  data: ItemListI[];
}

export interface ItemListI {
  sold: number;
  images: string[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
