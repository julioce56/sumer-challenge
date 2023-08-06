import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.scss']
})
export class DetailProductsComponent implements OnInit {

  product!: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductById(this.route.snapshot.paramMap.get('id'));
  }

  getProductById(id: string | null) {
    this.productService.getProductById(id ?? '').subscribe({
      next: (res) => {
        this.product = res;
      }
    })
  }

  setPrincipalImage(image: string) {
    this.product.thumbnail = image;
  }

}
