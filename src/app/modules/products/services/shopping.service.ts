import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CartProduct, Product } from '../components/models/product.model';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';
import { loadCart } from 'src/app/state/actions/shopping.action';
import { ToastrService } from 'ngx-toastr';
import { PRODUCT_ADDED, PRODUCT_REMOVED } from '../../shared/const/message.const';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  products: Array<CartProduct> = [];

  constructor(private store: Store<AppState>, private toastr: ToastrService) {
    this.store.select(selectCartProducts).subscribe({
      next: (res) => {
        this.products = res;
      },
    });
  }

  addProductToCart(product: CartProduct) {
    this.store.dispatch(
      loadCart({
        products: this.checkIfExistProduct([...this.products], product),
      })
    );
      this.toastr.success(PRODUCT_ADDED)
  }

  removeProductFromCart(product: CartProduct) {
    const index = this.products.findIndex((item) => item.id === product.id);
    let auxProducts = [...this.products];
    auxProducts.splice(index, 1);
    this.store.dispatch(
      loadCart({
        products: auxProducts,
      })
    );
    this.toastr.success(PRODUCT_REMOVED)
  }

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

  productExist(product: CartProduct | Product) {
    const index = this.products.findIndex((item) => item.id === product.id);
    return index !== -1;
  }

  getQuantity(product: CartProduct): number {
    const index = this.products.findIndex((item) => item.id === product.id);
    return index !== -1 ? this.products[index].quantity : 0;
  }
}
