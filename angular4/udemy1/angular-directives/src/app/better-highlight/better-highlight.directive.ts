import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  // constructor(private _elRef: ElementRef, private _renderer: Renderer2) { }

  @Input() defaultColor = 'transparent';
  // tslint:disable-next-line:no-input-rename
  @Input('appBetterHighlight') highlightColor = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  ngOnInit() {
    // this._renderer.setStyle(this._elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }


  @HostListener('mouseenter') mouseover(event: Event) {
    // this._renderer.setStyle(this._elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(event: Event) {
    // this._renderer.setStyle(this._elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
