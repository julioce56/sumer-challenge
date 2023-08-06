import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[lazy-src]'
})
export class LazySrcDirective implements OnInit, OnDestroy {
  @Input('lazy-src') lazySrc: string = '';
  @Input('lazy-id') lazyId: string = '';
  @Input('debug') debug: boolean = false;

  private use_IntersectionObserver: boolean;
  private _intersectionObserver?: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.use_IntersectionObserver = window['IntersectionObserver']
      ? true
      : false;
  }

  /* Se crea directiva de lazysize para ajustar el performance de las imágenes al cargar solo lo que el usuario
     ve en su ViewPort */
  ngOnInit() {
    this._intersectionObserver = new IntersectionObserver(
      entries => {
        this._CheckForIntersection(entries);
      },
      { threshold: 0.0, rootMargin: '0px 0px 256px 0px' }
    );
    this._intersectionObserver.observe(this.el.nativeElement);
  }

  private _CheckForIntersection = (
    entries: Array<IntersectionObserverEntry>
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.lazySrc);
        this.renderer.removeClass(this.el.nativeElement, 'img-blur');
      }
    });
  };

  ngOnDestroy() {}
}
