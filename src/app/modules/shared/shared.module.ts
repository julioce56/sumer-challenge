import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LazySrcDirective } from './directives/lazy-image.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LazySrcDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LazySrcDirective
  ]
})
export class SharedModule { }
