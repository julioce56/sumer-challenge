import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { CartProduct } from '../models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';
import { ShoppingService } from '../../services/shopping.service';
import { ToastrService } from 'ngx-toastr';
import { QUANTITY_INCORRECT } from 'src/app/modules/shared/const/message.const';
import {
  ADD_TO_CART,
  SET_CART,
} from 'src/app/modules/shared/const/button.const';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.scss'],
})
export class DetailProductsComponent implements OnInit {
  /** Current product */
  product!: CartProduct;

  /** Current quantity for product */
  productQuantity!: number;

  /** List products */
  products: Array<CartProduct> = [];

  /** Text on button */
  textOnButton: string = ADD_TO_CART;

  /**
   * Constructor
   * @param productService
   * @param route
   * @param store
   * @param shoppingService
   * @param toastr
   */
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private shoppingService: ShoppingService,
    private toastr: ToastrService
  ) {}

  /**
   * OnInit get current cart data from store
   */
  ngOnInit(): void {
    this.store.select(selectCartProducts).subscribe({
      next: (res) => {
        this.products = [...res];
      },
    });
    this.getProductById(this.route.snapshot.paramMap.get('id'));
  }

  /**
   * Get product by id in service
   * @param id item id
   */
  getProductById(id: string | null) {
    this.productService.getProductById(id ?? '').subscribe({
      next: (res: any) => {
        this.product = res;
        this.productQuantity = this.shoppingService.getQuantity(this.product);
        this.textOnButton = this.productQuantity ? SET_CART : this.textOnButton;
      },
    });
  }

  /**
   * Change principal image in the view
   * @param image image to set
   */
  setPrincipalImage(image: string) {
    this.product.thumbnail = image;
  }

  /**
   * Add product if quantity is correct
   * @param product item
   */
  addProductToCart(product: CartProduct) {
    if (this.productQuantity <= product.stock && this.productQuantity > 0) {
      product = { ...product, quantity: this.productQuantity ?? 1 };
      this.shoppingService.addProductToCart(product);
    } else {
      this.toastr.warning(QUANTITY_INCORRECT);
    }
  }

  /**
   * Valid if quantity is correct for will be set
   * @param product item
   * @param increase increase or decrease flag
   */
  validQuantity(product: CartProduct, increase: boolean) {
    this.productQuantity = increase
      ? this.productQuantity + 1
      : this.productQuantity - 1;
    if (this.productQuantity > product.stock || this.productQuantity <= 0) {
      this.toastr.warning(QUANTITY_INCORRECT);
      this.productQuantity = increase
        ? this.productQuantity - 1
        : this.productQuantity + 1;
    }
  }
}
