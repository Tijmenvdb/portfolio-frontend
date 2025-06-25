import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'portfolio-frontend' title`, () => {
    expect(app.title).toEqual('portfolio-frontend');
  });

  it(`should update the page`, () => {

    app.updatePage('/portfolio/data');
    expect(app.page).toEqual('portfolio');
    
    app.updatePage('/recipe-search/data');
    expect(app.page).toEqual('recipe-search');

    app.updatePage('/user-profile/data');
    expect(app.page).toEqual('user-profile');
  });
});
