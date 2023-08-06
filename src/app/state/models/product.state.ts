import { Product } from "src/app/modules/products/components/models/product.model";

export interface ProductState {
  loading: boolean,
  products: Array<Product>;
}
