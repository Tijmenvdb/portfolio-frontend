import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';
import { SimpleChange } from '@angular/core';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the drawer', () => {
    component.toggleDrawer(true);

    expect(component.isOpen).toBeTrue();
  });

  it('should disable the main content', () => {
    // push
    component.behavior = 'push';

    component.isOpen = true;
    expect(component.disableMain()).toBeFalse();

    component.isOpen = false;
    expect(component.disableMain()).toBeFalse();

    // overlay
    component.behavior = 'overlay';

    component.isOpen = true;
    expect(component.disableMain()).toBeTrue();

    component.isOpen = false;
    expect(component.disableMain()).toBeFalse();

    // fullscreen
    component.behavior = 'fullscreen';
    
    component.isOpen = true;
    expect(component.disableMain()).toBeTrue();

    component.isOpen = false;
    expect(component.disableMain()).toBeFalse();
  });

  it('should trap focus in drawer', fakeAsync(() => {
    const tabEvent = new KeyboardEvent('keydown', {key: 'Tab', shiftKey: false });
    const escEvent = new KeyboardEvent('keydown', {key: 'Escape' });
    
    // Adds focusable elements to drawer
    const html = '<button>Button 1</button><button>Button 2</button><button>Button 3</button>'
    component.drawer.nativeElement.innerHTML = html;
    
    const focusableElements = component.getFocusableElements(component.drawer);

    // Opens Drawer
    component.isOpen = true;
    component.behavior = 'overlay';
    
    component.ngOnChanges({
      isOpen: new SimpleChange(false, true, true)
    });

    fixture.changeDetectorRef.detectChanges();
    tick();

    expect(document.activeElement).toBe(focusableElements[0]);

    document.dispatchEvent(tabEvent);

    focusableElements[1].focus();
    document.dispatchEvent(tabEvent);

    focusableElements[2].focus();
    document.dispatchEvent(tabEvent);

    document.dispatchEvent(escEvent);
    fixture.changeDetectorRef.detectChanges();
    expect(component.isOpen).toBeFalse();
  }));


  
});
