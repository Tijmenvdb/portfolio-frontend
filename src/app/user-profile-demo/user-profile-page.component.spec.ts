import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePageComponent } from './user-profile-page.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserProfilePageComponent', () => {
  let component: UserProfilePageComponent;
  let fixture: ComponentFixture<UserProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilePageComponent, RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
