import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as productsMock from '../../shared/testing/products.mock';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [HttpClient, HttpTestingController],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts method work fine', () => {
    service.getProducts().subscribe({
      next: (res) => {
        expect(res).toEqual([]);
      },
    });
  });

  it('getProducts method should get data', () => {
    const spy = spyOn(service, 'getProducts').and.returnValue(
      of(productsMock.mock)
    );
    service.getProducts().subscribe({
      next: (res) => {
        expect(res.length).toEqual(5);
        expect(spy).toHaveBeenCalled();
      },
    });
  });

  it('getProductById method should get the specific product', () => {
    service.getProductById('1').subscribe({
      next: (res) => {
        expect(res).toEqual(productsMock.mock[0]);
      },
    });
  });
});
