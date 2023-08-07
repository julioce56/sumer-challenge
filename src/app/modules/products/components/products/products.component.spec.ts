import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { Store, StoreModule } from '@ngrx/store';
import { ShoppingService } from '../../services/shopping.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import * as productsMock from '../../../shared/testing/products.mock';
import { Router } from '@angular/router';
import { AppState, ROOT_REDUCERS } from 'src/app/state/app.state';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let shoppingService: ShoppingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(ROOT_REDUCERS),
      ],
      providers: [
        Store,
        ShoppingService,
        ToastrService,
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    shoppingService = TestBed.inject(ShoppingService);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.products = productsMock.mock;
    expect(component).toBeTruthy();
  });

  it('goToDetails method should navigate to the products/detail/${id} page', () => {
    component.goToDetails(1);
    const navArgs = routerSpy.navigate.calls.first().args[0];
    expect(navArgs).toEqual(['products/detail/1']);
  });

  it('addProductToCart method should call to shoppingService addProductToCart', () => {
    const spy = spyOn(shoppingService, 'addProductToCart');
    component.addProductToCart(productsMock.mock[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('removeProductFromCart method should call to shoppingService removeProductFromCart', () => {
    const spy = spyOn(shoppingService, 'removeProductFromCart');
    component.removeProductFromCart(productsMock.mock[1]);
    expect(spy).toHaveBeenCalled();
  });

  it('checkProductExist method should call to shoppingService productExist', () => {
    const spy = spyOn(shoppingService, 'productExist');
    component.checkProductExist(productsMock.mock[2]);
    expect(spy).toHaveBeenCalled();
  });

  it('ngOnInit works correctly (fakeAsync/tick)', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    component.showLoading = false;
  }));
});
