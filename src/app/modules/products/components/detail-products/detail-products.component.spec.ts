import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProductsComponent } from './detail-products.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { ROOT_REDUCERS } from 'src/app/state/app.state';
import * as productsMock from '../../../shared/testing/products.mock';
import { ShoppingService } from '../../services/shopping.service';
import { ProductService } from '../../services/products.service';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';

describe('DetailProductsComponent', () => {
  let component: DetailProductsComponent;
  let fixture: ComponentFixture<DetailProductsComponent>;
  let shoppingService: ShoppingService;
  let toastrService: ToastrService;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailProductsComponent],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot(ROOT_REDUCERS),
      ],
      providers: [
        HttpClient,
        Store,
        ToastrService,
        ShoppingService,
        ProductService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    shoppingService = TestBed.inject(ShoppingService);
    productService = TestBed.inject(ProductService);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(DetailProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setPrincipalImage method change the current product image', () => {
    const imageReplace: string =
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg';
    component.product = { ...productsMock.mockQuantity[2] };
    component.setPrincipalImage(imageReplace);
    expect(component.product.thumbnail).toEqual(imageReplace);
  });

  it('addProductToCart method should add product', () => {
    component.productQuantity = 2;
    const spy = spyOn(shoppingService, 'addProductToCart');
    component.addProductToCart(productsMock.mockQuantity[1]);
    expect(spy).toHaveBeenCalled();
  });

  it('addProductToCart method should call to the toast message', () => {
    const spy = spyOn(toastrService, 'warning');
    component.addProductToCart(productsMock.mockQuantity[2]);
    expect(spy).toHaveBeenCalled();
  });

  it('validQuantity method should valid if quantity is correct and increase', () => {
    component.productQuantity = 5;
    component.validQuantity(productsMock.mockQuantity[2], true);
    expect(component.productQuantity).toBeGreaterThan(5);
  });

  it('validQuantity method should valid if quantity is correct and decrease', () => {
    component.productQuantity = 5;
    component.validQuantity(productsMock.mockQuantity[2], false);
    expect(component.productQuantity).toBeLessThan(5);
  });

  it('validQuantity method should valid if quantity is not correct', () => {
    component.productQuantity = 36;
    const spy = spyOn(toastrService, 'warning');
    component.validQuantity(productsMock.mockQuantity[2], true);
    expect(spy).toHaveBeenCalled();
    expect(component.productQuantity).toEqual(36);
  });

  it('getProductById method should get product', () => {
    const spy = spyOn(productService, 'getProductById').and.returnValue(
      of<Product>(productsMock.mock[0])
    );
    component.getProductById('1');
    expect(spy).toHaveBeenCalled();
    expect(component.product.id).toEqual(productsMock.mock[0].id);
  });
});
