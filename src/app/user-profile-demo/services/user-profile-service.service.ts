import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, filter, Observable, of, Subject } from 'rxjs';

export interface CommentSection {
  title: string,
  order: number,
  isAddComment: boolean, //
  focusedComment: Comment | null, // focused
  comments: Comment[]
}

export interface Comment {
  // backend
  commentId: string, // id
  username: string,
  message: string,
  date?: string,
  replies: Comment[]

  // frontend
  isNew?: boolean,
}

export enum CommentElementType {
  Drawer = "comment-drawer", // comment drawer
  Header = "comment-drawer-header", // comment drawer header
  Section = "-section", // comment section container
  Comment = "-comment", // comment element itself
  Hook = "-hook", // hook element itself
  HookContainer = "-container", // container holding the hook TODO REMOVE
  MainContainer = "hook-container" // scrollable-main-container
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService { // Comment Data Service
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

    this.triggerSectionUpdate();
  }

  getNewComment(sectionId: string): Comment {
    return {
      commentId: sectionId,
      username: 'Anonymous',
      message: '',
      replies: [],
      isNew: true
    }
  }

  addComment(sectionId: string) {
    const section$ = this.commentSections.get(sectionId)
    const section = section$?.value;
    if(!section || section.comments[0]?.isNew) {
      return;
    }

    section.comments.unshift(this.getNewComment(sectionId));

    section$.next(section);

    this.triggerSectionUpdate();
  }

  updateSection(sectionId: string) {
    const section$ = this.commentSections.get(sectionId);
    section$?.next(section$.value);
  }

  cancelComment(sectionId: string) {
    console.log("cancel")
    const section$ = this.commentSections.get(sectionId)
    const section = section$?.value;
    if(!section) {
      return;
    }

    section.comments.shift();

    section$.next(section);

    this.triggerSectionUpdate();
  }

  triggerSectionUpdate() {
    this.commentSections = new Map(this.commentSections);
  }

  commentIndex = 4;
  sendComment(comment: Comment): Observable<Comment> {

    // save comment and returns commentId generated for it
    // then map to comment and return.

    comment.commentId = `${this.commentIndex++}`;
    comment.isNew = false;
    comment.date = '1 minute ago';

    return of(comment);
  }
}
