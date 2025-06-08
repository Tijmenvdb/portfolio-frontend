import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile-page',
  imports: [ ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent {

  githubUrl = 'https://www.github.com/Tijmenvdb/portfolio-frontend';
  linkedinUrl = 'https://www.linkedin.com/in/tijmenvdb/';

}
