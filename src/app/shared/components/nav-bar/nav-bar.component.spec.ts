import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { ActivatedRoute } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check page', () => {
    component.page = 'portfolio';
    component.checkPage();
    expect(component.isSearchEnabled).toBeFalse();
    expect(component.isPortfolioPage).toBeTrue();
    expect(component.isWalkthroughEnabled).toBeFalse();

    component.page = 'recipe-search';
    component.checkPage();
    expect(component.isSearchEnabled).toBeTrue();
    expect(component.isPortfolioPage).toBeFalse();
    expect(component.isWalkthroughEnabled).toBeTrue();

    component.page = 'user-profile';
    component.checkPage();
    expect(component.isSearchEnabled).toBeFalse();
    expect(component.isPortfolioPage).toBeFalse();
    expect(component.isWalkthroughEnabled).toBeTrue();
  });

  it('should toggle drawer', () => {
    component.isDrawerOpen = false;
    component.toggleDrawer(true);
    expect(component.isDrawerOpen).toBeTrue();
  })

  // TODO test viewport size changes
});
