import { createAction, props } from "@ngrx/store";
import { CartProduct } from "src/app/modules/products/models/product.model";

export const loadCart = createAction(
  '[loadCart] Load cart',
  props<{products: CartProduct[]}>()
)
