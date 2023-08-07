import { Component, OnInit } from '@angular/core';
import { CartProduct, Product } from '../models/product.model';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/state/actions/product.actions';
import { selectProducts } from 'src/app/state/selectors/product.selectors';
import { ShoppingService } from '../../services/shopping.service';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from 'src/app/modules/shared/const/button.const';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  /** List products */
  products: Array<Product> = [];

  /** Show spinner loading products */
  showLoading: boolean = true;

  /** Text on button add */
  addButtonText: string = ADD_TO_CART;

  /** Text on button remove */
  removeButtonText: string = REMOVE_FROM_CART;

  /**
   * Constructor
   * @param router
   * @param store
   * @param shoppingService
   */
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private shoppingService: ShoppingService
  ) {}

  /**
   * OnInit dispatch action for that effect get data from service and get all products
   */
  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.store.select(selectProducts).subscribe({
      next: (res) => {
        this.products = res;
        setTimeout(() => {
          this.showLoading = false;
        }, 1000);
      },
    });
  }

  /**
   * Redirect to products detail
   * @param id item id
   */
  goToDetails(id: number) {
    this.router.navigate([`products/detail/${id}`]);
  }

  /**
   * Add product to cart
   * @param product item
   */
  addProductToCart(product: Product) {
    let auxProduct = { ...product, quantity: 1 };
    this.shoppingService.addProductToCart(auxProduct);
  }

  /**
   * Remove product from cart
   * @param product item
   */
  removeProductFromCart(product: Product) {
    let auxProduct = { ...product, quantity: 1 };
    this.shoppingService.removeProductFromCart(auxProduct);
  }

  /**
   * Check if product exist in cart
   * @param product item
   * @returns flag true or false
   */
  checkProductExist(product: CartProduct | Product) {
    return this.shoppingService.productExist(product);
  }
}
