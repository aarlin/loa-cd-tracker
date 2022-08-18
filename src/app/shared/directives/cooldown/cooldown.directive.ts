import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[cooldown]'
})
export class CooldownDirective {
  constructor(private el: ElementRef) {
    console.log(this.el.nativeElement.src);
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    console.log(e)
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.onCooldown('');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isAvailable('');
  }

  private onCooldown(color: string) {
    this.el.nativeElement.style.filter = "grayscale(100%)";
  }

  private isAvailable(color: string) {
    this.el.nativeElement.style.filter = "initial";
  }
}
