import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';

@Component({
  selector: 'app-user-profile-page',
  imports: [ CommonModule, DrawerComponent, CommentSectionComponent ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent {

  isCommentOpen: boolean = false;
  isReducedLayout: boolean = false;
  isMobileLayout: boolean = false;

  commentSections: any[] = [
    {
      title: 'Profile Info',
      comments: [
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        },
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        },
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        }
      ]
    },
    {
      title: 'Profile Info',
      comments: [
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        },
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        },
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        }
      ]
    },
    {
      title: 'Profile Info',
      comments: [
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        },
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        },
        {
          username: "User X",
          message: "This is a comment by User X!",
          date: "1 hour ago",
          replies: [
            {
              username: "User A",
              message: "This is a reply by User A!",
              date: "30 minutes ago"
            },
            {
              username: "User B",
              message: "This is a reply by User B!",
              date: "39 minutes ago"
            },
            {
              username: "User C",
              message: "This is a reply by User C!",
              date: "45 minutes ago"
            }
          ]
        }
      ]
    }
  ];

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
}
