import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        title: 'Tijmen van der Beek | Portfolio',
        path: 'portfolio',
        loadComponent: () => import('./portfolio/portfolio-page.component').then(m => m.PortfolioPageComponent)
    },
    {
        title: 'Tijmen van der Beek | Recipe Search',
        path: 'recipe-search',
        loadComponent: () => import('./recipe-search-demo/recipe-search-page.component').then(m => m.RecipeSearchPageComponent)
    },
    {
        title: 'Tijmen van der Beek | User Profile',
        path: 'user-profile',
        loadComponent: () => import('./user-profile-demo/user-profile-page.component').then(m => m.UserProfilePageComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'portfolio'
    }
];
