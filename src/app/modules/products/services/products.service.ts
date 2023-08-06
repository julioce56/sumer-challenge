import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../components/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  url: string = environment.dummyUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get(`${this.url}/products`).pipe(
      map((res: any) => res.products)
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/products/${id}`);
  }
}
