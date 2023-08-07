import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Store, StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppState, ROOT_REDUCERS } from 'src/app/state/app.state';
import { loadCart } from 'src/app/state/actions/shopping.action';
import * as productsMock from '../testing/products.mock';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, StoreModule.forRoot(ROOT_REDUCERS)],
      providers: [Store, { provide: Router, useValue: routerSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkCount method is called from ng oninit', () => {
    const spy = spyOn(component, 'checkCount');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('goToCart method should navigate to the products/cart page', () => {
    component.goToCart();
    const navArgs = routerSpy.navigate.calls.first().args[0];
    expect(navArgs).toEqual(['products/cart']);
  });

  it('checkCount method should call to the store select', () => {
    store.dispatch(loadCart({ products: productsMock.mockQuantity }));
    store.select(selectCartProducts);
    component.checkCount();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
