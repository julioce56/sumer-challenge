import { Component, OnInit } from '@angular/core';
import { CartProduct, Product } from '../models/product.model';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/state/actions/product.actions';
import { selectProducts } from 'src/app/state/selectors/product.selectors';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.store.select(selectProducts).subscribe({
      next: (res) => {
        this.products = res;
      },
    });
  }

  goToDetails(id: number) {
    this.router.navigate([`products/detail/${id}`]);
  }

  addProductToCart(product: Product) {
    let auxProduct = { ...product, quantity: 1 };
    this.shoppingService.addProductToCart(auxProduct);
  }

  removeProductFromCart(product: Product) {
    let auxProduct = { ...product, quantity: 1 };
    this.shoppingService.removeProductFromCart(auxProduct);
  }

  checkProductExist(product: CartProduct | Product) {
    return this.shoppingService.productExist(product);
  }
}
