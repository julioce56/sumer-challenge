import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ShoppingState } from "../models/shopping.state";

export const selectShoppingFeature = (state: AppState) => state.cartProducts;

export const selectCartProducts = createSelector(
  selectShoppingFeature,
  (state: ShoppingState) => state.products
);
