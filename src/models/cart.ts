import { IProducts } from "../models/products";

export interface IAddToCart {
    productId: string;
    quantity?: number;
  }
  
  export interface ICheckOut {
    shippingAddress: string;
    paymentMethod: string;
    orderNotes?: string;
  }
  
  export interface IProductCart {
    productId: IProducts;
    price: number;
    quantity: number;
    name: string;
    _id?: string;  
  }