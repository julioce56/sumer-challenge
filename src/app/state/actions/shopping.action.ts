import { createAction, props } from "@ngrx/store";
import { CartProduct } from "src/app/modules/products/components/models/product.model";

export const loadCart = createAction(
  '[loadCart] Load cart',
  props<{products: CartProduct[]}>()
)
