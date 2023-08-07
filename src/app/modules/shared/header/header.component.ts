import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /** Badge count for cart */
  shoppingCount: number = 0;

  /**
   * Constructor
   * @param store
   * @param router
   */
  constructor(private store: Store<AppState>, private router: Router) {}

  /**
   * NgOnInit call check count method
   */
  ngOnInit(): void {
    this.checkCount();
  }

  /**
   * Check and subscribe for changes in store cart
   */
  checkCount() {
    this.store.select(selectCartProducts).subscribe({
      next: (res) => {
        let auxQuantity = 0;
        res.forEach((item) => {
          auxQuantity += item.quantity;
        });
        this.shoppingCount = auxQuantity;
      },
    });
  }

  /**
   * Redirect to products cart
   */
  goToCart() {
    this.router.navigate(['products/cart']);
  }
}
