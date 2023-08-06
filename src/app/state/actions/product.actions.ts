import { createAction, props } from "@ngrx/store";
import { CartProduct } from "src/app/modules/products/components/models/product.model";

export const loadProducts = createAction(
  '[Product] Load products'
);

export const loadedProducts = createAction(
  '[Product] Loaded products success',
  props<{products: CartProduct[]}>()
);
