import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent implements OnChanges {

  @HostListener('document:keydown', ['$event'])
  keydownEvent: Function = () => {};

  @ViewChild('drawer') drawer!: ElementRef<HTMLElement>;

  @Input()
  behavior: 'push' | 'overlay' | 'fullscreen' = 'push';

  @Input()
  position: 'left' | 'right' | 'top' | 'bottom' = 'bottom';

  @Input()
  isOpen: boolean = false;

  @Input()
  ariaLabel?: string;

  @Input()
  ariaLabelledby?: string;

  @Output()
  toggle: EventEmitter<boolean> = new EventEmitter();

  previouslyFocusedElement?: HTMLElement;

  roles: Record<string, string> = {
    'push' : 'complementary',
    'overlay' : 'dialog',
    'fullscreen' : 'main'
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes?.['isOpen'].currentValue != changes?.['isOpen'].previousValue && changes?.['isOpen'].currentValue) {
      this.previouslyFocusedElement = document.activeElement as HTMLElement;
      setTimeout(() => this.getFocusableElements(this.drawer)?.[0]?.focus({ preventScroll: true }));

      if(this.behavior == 'overlay') {
        this.keydownEvent = this.focusTrap;
      }
    }

    if(changes?.['isOpen'].currentValue != changes?.['isOpen'].previousValue && !changes?.['isOpen'].currentValue) {
      setTimeout(() =>  this.previouslyFocusedElement?.focus({ preventScroll: true }));
      this.keydownEvent = () => {};
    }
  }

  toggleDrawer(isOpen: boolean): void {
    this.isOpen = isOpen;
    this.toggle.emit(isOpen);
  }

  disableMain(): boolean {
    return this.isOpen && this.behavior !== 'push';
  }

  focusTrap(event: KeyboardEvent) {
    const focusableElements = this.getFocusableElements(this.drawer);
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements?.length - 1];
    const activeElement = document.activeElement as HTMLElement;
    
    if (event.key == 'Tab') {
      if (event.shiftKey && firstElement === activeElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if(!event.shiftKey && lastElement === activeElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    if(event.key == 'Escape') {
      this.toggleDrawer(false);
    }
  }

  getFocusableElements(container: ElementRef<HTMLElement>): NodeListOf<HTMLElement> {
    const focusableSelectors = `
      a[href],
      button:not([disabled]),
      textarea:not([disabled]),
      input:not([disabled]),
      select:not([disabled]),
      [tabindex]:not([tabindex="-1"])
    `;

    return container?.nativeElement.querySelectorAll<HTMLElement>(focusableSelectors);
  }
}
