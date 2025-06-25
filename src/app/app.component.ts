import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-frontend';
  page: 'portfolio' | 'recipe-search' | 'user-profile' = 'portfolio';

  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updatePage(document.URL);
    }

    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.updatePage(url)
    });
  }

  updatePage(url: string) {
    if(url.includes('portfolio')) {
      this.page = 'portfolio'
    } else if(url.includes('recipe-search')) {
      this.page = 'recipe-search'
    } else if(url.includes('user-profile')) {
      this.page = 'user-profile'
    }
  }
}
