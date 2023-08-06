import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { DetailProductsComponent } from './components/detail-products/detail-products.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent
  },
  {
    path: 'detail', redirectTo: '', pathMatch: 'full'
  },
  {
    path: 'detail/:id', component: DetailProductsComponent
  },
  {
    path: 'cart', component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
