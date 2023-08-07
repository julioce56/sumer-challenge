import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as productsMock from '../../shared/testing/products.mock';
import { of } from 'rxjs';
import { ShoppingService } from './shopping.service';
import { Store, StoreModule } from '@ngrx/store';
import { AppState, ROOT_REDUCERS } from 'src/app/state/app.state';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { loadCart } from 'src/app/state/actions/shopping.action';

describe('ShoppingService', () => {
  let service: ShoppingService;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(ROOT_REDUCERS),
      ],
      providers: [HttpClient, HttpTestingController, ToastrService],
    });
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(ShoppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addProductToCart method should dispatch data to the store', () => {
    store.dispatch(loadCart({ products: productsMock.mockQuantity }));
    service.addProductToCart(productsMock.mockQuantity[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('removeProductFromCart method should dispatch data modified to the store', () => {
    store.dispatch(loadCart({ products: productsMock.mockQuantity }));
    service.removeProductFromCart(productsMock.mockQuantity[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('checkIfExistProduct method valid if a product exist, then add', () => {
    let product = { ...productsMock.mockQuantity[0], id: 100 };
    let products = [...productsMock.mockQuantity];
    const serv = service.checkIfExistProduct(products, product);
    expect(serv.length).toEqual(6);
  });

  it('checkIfExistProduct method valid if a product exist, then update', () => {
    let product = { ...productsMock.mockQuantity[0] };
    let products = [...productsMock.mockQuantity];
    const serv = service.checkIfExistProduct(products, product);
    expect(serv.length).toEqual(5);
  });

  it('productExist method valid if a product exist', () => {
    let product = { ...productsMock.mockQuantity[1] };
    service.products = [...productsMock.mockQuantity];
    const serv = service.productExist(product);
    expect(serv).toBeTrue();
  });

  it('productExist method valid if a product not exist', () => {
    let product = { ...productsMock.mockQuantity[1], id: 100 };
    service.products = [...productsMock.mockQuantity];
    const serv = service.productExist(product);
    expect(serv).toBeFalse();
  });

  it('getQuantity method return the quantity(found) product', () => {
    let product = { ...productsMock.mockQuantity[1] };
    service.products = [...productsMock.mockQuantity];
    const serv = service.getQuantity(product);
    expect(serv).toEqual(12);
  });

  it('getQuantity method return the quantity(not found) product', () => {
    let product = { ...productsMock.mockQuantity[1], id: 100 };
    service.products = [...productsMock.mockQuantity];
    const serv = service.getQuantity(product);
    expect(serv).toEqual(0);
  });
});
