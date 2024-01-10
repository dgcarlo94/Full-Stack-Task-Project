import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShadowBox]',
  standalone: true
})
export class ShadowBoxDirective {

  @HostListener('mouseenter') onMouseEnter()
  {
    this.element.nativeElement.style.boxShadow = '0px 4px 8px black';
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    this.element.nativeElement.style.boxShadow = 'none';
  }

  constructor(private element: ElementRef){}
}
