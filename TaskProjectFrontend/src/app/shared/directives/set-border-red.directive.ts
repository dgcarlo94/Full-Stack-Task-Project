import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSetBorderRed]',
  standalone: true
})
export class SetBorderRedDirective {

  @Input('appSetBorderRed') set setBorderColor(isInvalid:boolean | undefined)
  {
    this.elementRef.nativeElement.style.border = isInvalid ? '2px solid red' : '1px solid black'
  }

  constructor(private elementRef: ElementRef){}

}
