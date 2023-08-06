import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadedProducts,
} from '../actions/product.actions';
import { ProductState } from '../models/product.state';

export const initialState: ProductState = { loading: false, products: [] };

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedProducts, (state, { products }) => {
    return { ...state, loading: false, products };
  })
);


