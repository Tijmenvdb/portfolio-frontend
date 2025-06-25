import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, DrawerComponent, RouterModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnChanges, OnDestroy {
  githubUrl = 'https://www.github.com/Tijmenvdb/portfolio-frontend';
  linkedinUrl = 'https://www.linkedin.com/in/tijmenvdb/';
  portfolioUrl = '/portfolio';
  aboutFragment = 'about';
  demoFragment = 'projects';
  contactFragment = 'contact';

  @Input()
  page: 'portfolio' | 'recipe-search' | 'user-profile' = 'portfolio';

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  @Output()
  searchBtn: EventEmitter<void> = new EventEmitter();

  @Output()
  walkthrough: EventEmitter<void> = new EventEmitter();

  // elements
  isSearchEnabled: boolean = false;
  isPortfolioPage: boolean = false;
  isWalkthroughEnabled: boolean = false;

  // layout
  isMobileLayout: boolean = false;
  isSearchReduced: boolean = false;
  isDrawerOpen: boolean = false;

  searchStr: string = '';

  private mobileMediaQuery?: MediaQueryList;
  private reducedMediaQuery?: MediaQueryList;
  private mobileListener = (e: MediaQueryListEvent) => this.isMobileLayout = e.matches;
  private reducedListener = (e: MediaQueryListEvent) => this.isSearchReduced = e.matches;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Todo Create a windowRef Class injectable
    if (isPlatformBrowser(this.platformId)) {
      this.mobileMediaQuery = window.matchMedia('(max-width: 37rem)');
      this.reducedMediaQuery = window.matchMedia('(max-width: 50rem)');
      this.isMobileLayout = this.mobileMediaQuery.matches;
      this.isSearchReduced = this.reducedMediaQuery.matches;
      this.mobileMediaQuery.addEventListener('change', this.mobileListener);
      this.reducedMediaQuery.addEventListener('change', this.reducedListener);
    }

    this.checkPage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkPage();
  }

  ngOnDestroy(): void {
    this.mobileMediaQuery?.removeEventListener('change', this.mobileListener);
    this.reducedMediaQuery?.removeEventListener('change', this.reducedListener);
  }

  checkPage() {
    switch(this.page) {
      case 'portfolio': {
        this.isSearchEnabled = false;
        this.isPortfolioPage = true;
        this.isWalkthroughEnabled = false;
        break;
      }
      case 'recipe-search': {
        this.isSearchEnabled = true;
        this.isPortfolioPage = false;
        this.isWalkthroughEnabled = true;
        break;
      }
      case 'user-profile': {
        this.isSearchEnabled = false;
        this.isPortfolioPage = false;
        this.isWalkthroughEnabled = true;
        break;
      }
    }
  }

  toggleDrawer(value: boolean) {
    this.isDrawerOpen = value;
  }
}
