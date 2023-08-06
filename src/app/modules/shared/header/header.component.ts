import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCartProducts } from 'src/app/state/selectors/shopping.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shoppingCount: number = 0;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.checkCount();
  }

  checkCount() {
    this.store.select(selectCartProducts).subscribe({
      next: (res) => {
        let auxQuantity = 0;
        res.forEach((item) => {
          auxQuantity += item.quantity
        });
        this.shoppingCount = auxQuantity;
      }
    })
  }

  goToCart() {
    this.router.navigate(['products/cart']);
  }

}
