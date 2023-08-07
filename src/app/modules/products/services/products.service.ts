import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../components/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /** Dummy url for products */
  url: string = environment.dummyUrl;

  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Get all products
   * @returns observable of products
   */
  getProducts(): Observable<Product[]> {
    return this.http
      .get(`${this.url}/products`)
      .pipe(map((res: any) => res.products));
  }

  /**
   * Get product by id
   * @param id item id
   * @returns observable of product
   */
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/products/${id}`);
  }
}
