import { createReducer, on } from '@ngrx/store';
import {
  addItemToLocalStorage,
  checkItemExistInLocalStorage,
} from '../persistence-data.state';
import { loadCart } from '../actions/shopping.action';
import { ShoppingState } from '../models/shopping.state';

export const initialState: ShoppingState =
  checkItemExistInLocalStorage('loadCart');

export const shoppingReducer = createReducer(
  initialState,
  on(loadCart, (state, { products }) => {
    addItemToLocalStorage(
      'loadCart',
      { ...state, loading: false, products }
    );
    return { ...state, loading: false, products };
  })
);
