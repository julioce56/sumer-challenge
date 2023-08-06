import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProductState } from "../models/product.state";

export const selectProductFeature = (state: AppState) => state.products;

export const selectProducts = createSelector(
  selectProductFeature,
  (state: ProductState) => state.products
);
