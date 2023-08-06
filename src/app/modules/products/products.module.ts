import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { DetailProductsComponent } from './components/detail-products/detail-products.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent,
    DetailProductsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [ToastrService]
})
export class ProductsModule { }
