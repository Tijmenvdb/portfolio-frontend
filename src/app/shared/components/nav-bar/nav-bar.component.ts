import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
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
  isPortfoiloPage: boolean = false;
  isWalkthroughEnabled: boolean = false;

  // layout
  isMobileLayout: boolean = false;
  isSearchReduced: boolean = false;
  isDrawerOpen: boolean = false;

  searchStr: string = '';

  private mobileMediaQuery = window.matchMedia('(max-width: 37rem)');
  private reducedMediaQuery = window.matchMedia('(max-width: 50rem)');
  private mobileListener = (e: MediaQueryListEvent) => this.isMobileLayout = e.matches;
  private reducedListener = (e: MediaQueryListEvent) => this.isSearchReduced = e.matches;

  ngOnInit() {
    this.isMobileLayout = this.mobileMediaQuery.matches;
    this.isSearchReduced = this.reducedMediaQuery.matches;
    this.mobileMediaQuery.addEventListener('change', this.mobileListener);
    this.reducedMediaQuery.addEventListener('change', this.reducedListener);

    this.checkPage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkPage();
  }

  ngOnDestroy(): void {
    this.mobileMediaQuery.removeEventListener('change', this.mobileListener);
    this.reducedMediaQuery.removeEventListener('change', this.reducedListener);
  }

  checkPage() {
    switch(this.page) {
      case 'portfolio': {
        this.isSearchEnabled = false;
        this.isPortfoiloPage = true;
        this.isWalkthroughEnabled = false;
        break;
      }
      case 'recipe-search': {
        this.isSearchEnabled = true;
        this.isPortfoiloPage = false;
        this.isWalkthroughEnabled = true;
        break;
      }
      case 'user-profile': {
        this.isSearchEnabled = false;
        this.isPortfoiloPage = false;
        this.isWalkthroughEnabled = true;
        break;
      }
    }
  }

  toggleDrawer(value: boolean) {
    this.isDrawerOpen = value;
  }

  onSearch() {
    this.search.emit(this.searchStr);
  }

  onSearchBtn() {
    this.searchBtn.emit();
  }

  onWalkthrough() {
    this.walkthrough.emit();
  }
}
