import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CartProduct } from '../models/product.model';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';
import { ShoppingService } from '../../services/shopping.service';
import { Router } from '@angular/router';
import { QUANTITY_INCORRECT } from 'src/app/modules/shared/const/message.const';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Array<CartProduct> = [];
  totalValue: number = 0;
  totalQuantity: number = 0;
  productQuantity!: number;

  constructor(private store: Store<AppState>, private toastr: ToastrService, private shoppingService: ShoppingService, private router: Router) { }

  ngOnInit(): void {
    this.store.select(selectCartProducts).subscribe({
      next: (res) => {
        this.products = [];
        this.totalValue = 0;
        this.totalQuantity = 0;
        res.forEach((item) => {
          this.products.push({...item});
        })
        this.checkValues();
      }
    })
  }

  removeProductFromCart(product: CartProduct) {
    this.shoppingService.removeProductFromCart(product);
  }

  checkValues() {
    this.products.forEach((item) => {
      this.totalValue += item.price * item.quantity;
      this.totalQuantity += item.quantity;
    });
  }

  goTo(id: number) {
    this.router.navigate([`products/detail/${id}`]);
  }

  validQuantity(product: CartProduct, increase: boolean) {
    let aux = increase ? product.quantity + 1 : product.quantity - 1;
    if (aux <= product.stock && aux > 0) {
      this.shoppingService.addProductToCart({...product, quantity: aux});
    } else {
      this.toastr.warning(QUANTITY_INCORRECT);
    }

  }


}
