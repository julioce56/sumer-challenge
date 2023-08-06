import { ActionReducerMap } from "@ngrx/store";
import { ProductState } from "./models/product.state";
import { productReducer } from "./reducers/product.reducers";
import { ShoppingState } from "./models/shopping.state";
import { shoppingReducer } from "./reducers/shopping.reducers";

export interface AppState {
  products: ProductState
  cartProducts: ShoppingState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  products: productReducer,
  cartProducts: shoppingReducer
}
