import { Product } from "src/app/modules/products/models/product.model";

export interface ProductState {
  loading: boolean,
  products: Array<Product>;
}
