import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CartProduct } from '../models/product.model';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';
import { ShoppingService } from '../../services/shopping.service';
import { Router } from '@angular/router';
import { QUANTITY_INCORRECT } from 'src/app/modules/shared/const/message.const';
import { ToastrService } from 'ngx-toastr';
import { REMOVE_FROM_CART } from 'src/app/modules/shared/const/button.const';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  /** List products */
  products: Array<CartProduct> = [];

  /** Total value all products in cart */
  totalValue: number = 0;

  /** Total quantity all products in cart */
  totalQuantity: number = 0;

  /** Remove text on button */
  removeButtonText: string = REMOVE_FROM_CART;

  /**
   * Constructor
   * @param store
   * @param toastr
   * @param shoppingService
   * @param router
   */
  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService,
    private shoppingService: ShoppingService,
    private router: Router
  ) {}

  /**
   * OnInit, get cart data from store
   */
  ngOnInit(): void {
    this.store.select(selectCartProducts).subscribe({
      next: (res) => {
        this.products = [];
        this.totalValue = 0;
        this.totalQuantity = 0;
        res.forEach((item) => {
          this.products.push({ ...item });
        });
        this.checkValues();
      },
    });
  }

  /**
   * Remove items from cart
   * @param product item to remove
   */
  removeProductFromCart(product: CartProduct) {
    this.shoppingService.removeProductFromCart(product);
  }

  /**
   * Check total values
   */
  checkValues() {
    this.products.forEach((item) => {
      this.totalValue += item.price * item.quantity;
      this.totalQuantity += item.quantity;
    });
  }

  /**
   * Redirect to product detail
   * @param id item id
   */
  goTo(id: number) {
    this.router.navigate([`products/detail/${id}`]);
  }

  /**
   * Valid if quantity is correct
   * @param product item
   * @param increase increase or decrease flag
   */
  validQuantity(product: CartProduct, increase: boolean) {
    let aux = increase ? product.quantity + 1 : product.quantity - 1;
    if (aux <= product.stock && aux > 0) {
      this.shoppingService.addProductToCart({ ...product, quantity: aux });
    } else {
      this.toastr.warning(QUANTITY_INCORRECT);
    }
  }
}
