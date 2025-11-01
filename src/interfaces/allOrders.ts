import { ProductI } from "./product";

export interface OrdersI {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
