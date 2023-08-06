import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';
import { ProductService } from 'src/app/modules/products/services/products.service';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Product] Load products'),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ({
            type: '[Product] Loaded products success',
            products,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
