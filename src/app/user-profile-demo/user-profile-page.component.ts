import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-profile-page',
  imports: [ DrawerComponent ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent {

  isCommentOpen: boolean = false;
  isReducedLayout: boolean = false;
  isMobileLayout: boolean = false;

  private reducedMediaQuery?: MediaQueryList;
  private reducedListener = (e: MediaQueryListEvent) => this.isReducedLayout = e.matches;
  private mobileMediaQuery?: MediaQueryList;
  private mobileListener = (e: MediaQueryListEvent) => this.isMobileLayout = e.matches;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.reducedMediaQuery = window.matchMedia('(max-width: 50rem)');
      this.reducedMediaQuery.addEventListener('change', this.reducedListener);
      this.isReducedLayout = this.reducedMediaQuery.matches;

      this.mobileMediaQuery = window.matchMedia('(max-width: 37rem)');
      this.mobileMediaQuery.addEventListener('change', this.mobileListener);
      this.isMobileLayout = this.mobileMediaQuery.matches;
    }
  }

  ngOnDestroy(): void {
    this.reducedMediaQuery?.removeEventListener('change', this.reducedListener);
    this.mobileMediaQuery?.removeEventListener('change', this.mobileListener);
  }

  toggleDrawer(value: boolean) {
    this.isCommentOpen = value;
  }
}
