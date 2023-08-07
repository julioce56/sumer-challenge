import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CartProduct, Product } from '../components/models/product.model';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';
import { loadCart } from 'src/app/state/actions/shopping.action';
import { ToastrService } from 'ngx-toastr';
import {
  PRODUCT_ADDED,
  PRODUCT_REMOVED,
} from '../../shared/const/message.const';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  /** List products */
  products: Array<CartProduct> = [];

  /**
   * Constructor
   * @param store
   * @param toastr
   */
  constructor(private store: Store<AppState>, private toastr: ToastrService) {
    this.store.select(selectCartProducts).subscribe({
      next: (res) => {
        this.products = res;
      },
    });
  }

  /**
   * Add product to cart
   * @param product item
   */
  addProductToCart(product: CartProduct) {
    this.store.dispatch(
      loadCart({
        products: this.checkIfExistProduct([...this.products], product),
      })
    );
    this.toastr.success(PRODUCT_ADDED);
  }

  /**
   * Remove product from cart if exist
   * @param product item
   */
  removeProductFromCart(product: CartProduct) {
    const index = this.products.findIndex((item) => item.id === product.id);
    let auxProducts = [...this.products];
    auxProducts.splice(index, 1);
    this.store.dispatch(
      loadCart({
        products: auxProducts,
      })
    );
    this.toastr.success(PRODUCT_REMOVED);
  }

  /**
   * Check if product exist, if exist update de data, if not exist add product
   * @param currentProducts current products
   * @param product item
   * @returns current products modified
   */
  checkIfExistProduct(currentProducts: CartProduct[], product: CartProduct) {
    const index = currentProducts.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      currentProducts[index] = {
        ...currentProducts[index],
        quantity: product.quantity,
      };
    } else {
      currentProducts.push(product);
    }
    return currentProducts;
  }

  /**
   * Check if product exist
   * @param product item
   * @returns flag true or false
   */
  productExist(product: CartProduct | Product) {
    const index = this.products.findIndex((item) => item.id === product.id);
    return index !== -1;
  }

  /**
   * Get quantity if product exist
   * @param product item
   * @returns quantity
   */
  getQuantity(product: CartProduct): number {
    const index = this.products.findIndex((item) => item.id === product.id);
    return index !== -1 ? this.products[index].quantity : 0;
  }
}
