import { CartProduct } from "src/app/modules/products/models/product.model";

export interface ShoppingState {
  loading: boolean,
  products: Array<CartProduct>;
}
