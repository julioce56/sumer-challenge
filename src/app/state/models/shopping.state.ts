import { CartProduct } from "src/app/modules/products/components/models/product.model";

export interface ShoppingState {
  loading: boolean,
  products: Array<CartProduct>;
}
