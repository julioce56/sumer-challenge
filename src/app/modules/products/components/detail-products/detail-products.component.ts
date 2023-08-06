import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { CartProduct } from '../models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';
import { loadCart } from 'src/app/state/actions/shopping.action';
import { ShoppingService } from '../../services/shopping.service';
import { ToastrService } from 'ngx-toastr';
import { QUANTITY_INCORRECT } from 'src/app/modules/shared/const/message.const';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.scss'],
})
export class DetailProductsComponent implements OnInit {
  product!: CartProduct;
  productQuantity!: number;
  products: Array<CartProduct> = [];
  textOnButton: string = 'Agregar al Carrito';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private shoppingService: ShoppingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.store.select(selectCartProducts).subscribe({
      next: (res) => {
        this.products = [...res];
      },
    });
    this.getProductById(this.route.snapshot.paramMap.get('id'));
  }

  getProductById(id: string | null) {
    this.productService.getProductById(id ?? '').subscribe({
      next: (res: any) => {
        this.product = res;
        this.productQuantity = this.shoppingService.getQuantity(this.product);
        this.textOnButton = this.productQuantity ? 'Actualizar Carrito' : this.textOnButton;
      },
    });
  }

  setPrincipalImage(image: string) {
    this.product.thumbnail = image;
  }

  addProductToCart(product: CartProduct) {
    if (this.productQuantity <= product.stock && this.productQuantity > 0) {
      product = { ...product, quantity: this.productQuantity ?? 1 };
      this.shoppingService.addProductToCart(product);
    } else {
      this.toastr.warning(QUANTITY_INCORRECT);
    }
  }

  validQuantity(product: CartProduct, increase: boolean) {
    this.productQuantity = increase ? this.productQuantity + 1 : this.productQuantity - 1;
    if (this.productQuantity > product.stock || this.productQuantity <= 0) {
      this.toastr.warning(QUANTITY_INCORRECT);
      this.productQuantity = increase ? this.productQuantity - 1 : this.productQuantity + 1;
    }
  }
}
