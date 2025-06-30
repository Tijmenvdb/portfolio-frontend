import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, filter, Subject } from 'rxjs';

export interface CommentSection {
  title: string,
  order: number,
  isAddComment: boolean,
  focusedComment: Comment | null,
  comments: Comment[]
}

export interface Comment {
  commentId: string,
  username: string,
  message: string,
  date: string,
  replies: Comment[]
}

export enum CommentElementType {
  Drawer = "comment-drawer",
  Header = "comment-drawer-header",
  Section = "-section",
  Comment = "-comment",
  Hook = "-hook",
  HookContainer = "-container",
  MainContainer = "hook-container"
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService { // CommentService
  isDrawerOpen = false;

  commentSections: Map<string, BehaviorSubject<CommentSection>> = new Map();

  loadQueue$: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  constructor() {
    this.loadQueue$.pipe(
      debounceTime(20),
      filter(sectionIds => sectionIds.length > 0)
    ).subscribe((sectionIds) => {
      this.loadQueue$.next([]);
      this.loadComments(sectionIds);
    });
  }

  initHook(sectionId: string, title: string, order: number): BehaviorSubject<CommentSection> {
    const commentSection: CommentSection = {
      title: title,
      order: order,
      isAddComment: false,
      focusedComment: null,
      comments: []
    };

    const commentSection$: BehaviorSubject<CommentSection> = new BehaviorSubject(commentSection);

    this.commentSections.set(sectionId, commentSection$);
    this.loadQueue$.next([...this.loadQueue$.value, sectionId]);
    this.triggerSectionUpdate();

    return commentSection$;
  }

  destroyHook(sectionId: string) {

    const commentSection$ = this.commentSections.get(sectionId);
    commentSection$?.complete();
    this.commentSections.delete(sectionId);

    this.triggerSectionUpdate();
  }

  loadComments(sectionIds: string[]) {
    const commentSections: any = {
      'personal-info': [
        {
          commentId: "0",
          username: "User X",
          message: "This is a comment by User X under Profile Info!",
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
          commentId: "1",
          username: "User X",
          message: "This is a comment by User X under Profile Info!",
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
          commentId: "2",
          username: "User X",
          message: "This is a comment by User X under Profile Info!",
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
      ],
      'preferences': [
        {
          commentId: "3",
          username: "User X",
          message: "This is a comment by User X under Prefernces!",
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
    };

    sectionIds.forEach((sectionId) => {
      const commentSection$ = this.commentSections.get(sectionId);
      const commentSection = commentSection$?.value;

      if (commentSection) {
        commentSection.comments = commentSections[sectionId] ?? [];
        commentSection$.next(commentSection);
      }
    });

    console.log("Loading Hooks: ", Array.from(this.commentSections.entries()))
  }

  isFocused: boolean = false;
  focusedHook?: HTMLElement | null;
  focusedComment?: HTMLElement | null;
  focusOn?: HTMLElement | null;
  focusedListener?: any;
  returnHook?: HTMLElement | null;
  ignoreNext: boolean = false;

  removeFocus() {
    /*if(!this.isFocused) {
      return;
    } */
    console.log("Forcing Focus Removal");

    // this.isFocused = false;
    this.focusedHook?.classList.remove('focus');
    this.focusedComment?.classList.remove('focus');
    // document.removeEventListener('click', this.focusedListener);
    // console.log("Forcing Focus Removal");
  }

  switchFocus(sectionId: string, commentId?: string) {
    this.ignoreNext = true;
    this.focusedHook?.classList.remove('focus');
    this.focusedComment?.classList.remove('focus');
    
    this.focusedHook = document.getElementById(sectionId + CommentElementType.Hook);
    this.focusedComment = document.getElementById((commentId ?? sectionId) + CommentElementType.Comment);

    this.focusedHook?.classList.add('focus');
    this.focusedComment?.classList.add('focus');
  }

  createFocus(sectionId: string, commentId?: string) {
    this.isFocused = true;
    this.focusedHook = document.getElementById(sectionId + CommentElementType.Hook);
    this.focusedComment = document.getElementById((commentId ?? sectionId) + CommentElementType.Comment);

    this.focusedHook?.classList.add('focus');
    this.focusedComment?.classList.add('focus');

    this.focusedListener = (event: MouseEvent) => {
      if(this.ignoreNext) {
        this.ignoreNext = false;
      } else if ((!this.focusedHook && !this.focusedComment) || (!this.focusedHook?.contains(event.target as Node) && !this.focusedComment?.contains(event.target as Node))) {

        console.log("Removing Focus");
        this.isFocused = false;
        this.focusedHook?.classList.remove('focus');
        this.focusedComment?.classList.remove('focus');
        
        document.removeEventListener('click', this.focusedListener);
      }
    }

    setTimeout(() => document.addEventListener('click', this.focusedListener));
  }

  focusCommentOld(sectionId: string, commentId?: string) {
    if(this.isFocused) {
      this.switchFocus(sectionId, commentId);
    } else {
      this.createFocus(sectionId, commentId);
    }
  }

  focusComment(sectionId: string, commentId?: string) {
    this.focusedHook?.classList.remove('focus');
    this.focusedComment?.classList.remove('focus');
    
    this.focusedHook = document.getElementById(sectionId + CommentElementType.Hook);
    this.focusedComment = document.getElementById((commentId ?? sectionId) + CommentElementType.Comment);

    this.focusedHook?.classList.add('focus');
    this.focusedComment?.classList.add('focus');
  }

  tabIntoComment() {
    const button = this.focusedComment?.getElementsByTagName('button')?.[0];
    const input = this.focusedComment?.getElementsByTagName('input')?.[0];
    this.focusOn = input ?? button;
    this.focusOn?.focus({preventScroll: true});
  }

  tabIntoHook() {
    this.focusedHook?.focus({preventScroll: true});
  }

  scrollToSection(sectionId: string) {
    const sectionEle = document.getElementById(sectionId + CommentElementType.Section);
    const drawerEle = document.getElementById(CommentElementType.Drawer);
    const headerEle = document.getElementById(CommentElementType.Header);

    const style = getComputedStyle(headerEle as Element);
    const marginTop = parseFloat(style.marginTop);
    const marginBottom = parseFloat(style.marginBottom);

    const headerHeight = (headerEle?.offsetHeight ?? 0) + marginTop + marginBottom;

    drawerEle?.scrollTo(
      {
        top: sectionEle? sectionEle.offsetTop - headerHeight : 0
      }
    )

  }

  scrollToHook(sectionId: string) {
    const hookEle = document.getElementById(sectionId + CommentElementType.HookContainer);
    const mainEle = document.getElementById(CommentElementType.MainContainer);
    const headerEle = document.getElementById(CommentElementType.Header);

    const style = getComputedStyle(headerEle as Element);
    const marginTop = parseFloat(style.marginTop);
    const marginBottom = parseFloat(style.marginBottom);

    const headerHeight = (headerEle?.offsetHeight ?? 0) + marginTop + marginBottom;

    mainEle?.scrollTo(
      {
        top: hookEle? hookEle.offsetTop - headerHeight : 0
      }
    )
  }

  triggerSectionUpdate() {
    this.commentSections = new Map(this.commentSections);
  }

  saveComment(sectionId: string, parentId: string | null) {
    // save comment and returns commentId generated for it
  }
}
