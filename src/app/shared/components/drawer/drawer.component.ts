import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

  @Input()
  behavior: 'push' | 'overlay' | 'fullscreen' = 'push';

  @Input()
  position: 'left' | 'right' | 'top' | 'bottom' = 'bottom';

  @Input()
  isOpen: boolean = false;

  toggleDrawer(isOpen: boolean): void {
    this.isOpen = isOpen;
  }

  disableMain(): boolean {
    return !this.isOpen || this.behavior.match('push')? false : true;
  }
}
