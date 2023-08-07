/**
 * Product object
 */
export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<string>;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

/**
 * Product object for cart
 */
export interface CartProduct extends Product {
  quantity: number;
}
