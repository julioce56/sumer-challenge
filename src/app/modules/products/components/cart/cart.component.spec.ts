import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { Store, StoreModule } from '@ngrx/store';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ROOT_REDUCERS } from 'src/app/state/app.state';
import { ShoppingService } from '../../services/shopping.service';
import * as productsMock from '../../../shared/testing/products.mock';
import { Router } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let shoppingService: ShoppingService;
  let toastrService: ToastrService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [ToastrModule.forRoot(), StoreModule.forRoot(ROOT_REDUCERS)],
      providers: [
        Store,
        ToastrService,
        ShoppingService,
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    shoppingService = TestBed.inject(ShoppingService);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removeProductFromCart method should call to the shoppingService remove method', () => {
    const spy = spyOn(shoppingService, 'removeProductFromCart');
    component.removeProductFromCart(productsMock.mockQuantity[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('goTo method should navigate to the products/detail/${id} page', () => {
    component.goTo(1);
    const navArgs = routerSpy.navigate.calls.first().args[0];
    expect(navArgs).toEqual(['products/detail/1']);
  });

  it('validQuantity method should valid quantity for increase', () => {
    const spy = spyOn(shoppingService, 'addProductToCart');
    component.validQuantity(productsMock.mockQuantity[3], true);
    expect(spy).toHaveBeenCalled();
  });

  it('validQuantity method should valid quantity for decrease', () => {
    const spy = spyOn(shoppingService, 'addProductToCart');
    component.validQuantity(productsMock.mockQuantity[3], false);
    expect(spy).toHaveBeenCalled();
  });

  it('validQuantity method should valid quantity is not correct', () => {
    let product = { ...productsMock.mockQuantity[3], quantity: 1000 };
    const spy = spyOn(toastrService, 'warning');
    component.validQuantity(product, true);
    expect(spy).toHaveBeenCalled();
  });

  it('checkValues method should check global values', () => {
    component.products = productsMock.mockQuantity;
    component.checkValues();
    expect(component.totalValue).not.toEqual(0);
    expect(component.totalQuantity).not.toEqual(0);
  });
});
