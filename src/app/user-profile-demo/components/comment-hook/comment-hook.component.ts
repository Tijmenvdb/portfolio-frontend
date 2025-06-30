import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommentElementType, CommentSection, UserProfileServiceService } from '../../services/user-profile-service.service';
import { BehaviorSubject, delay, take } from 'rxjs';

@Component({
  selector: 'app-comment-hook',
  imports: [],
  templateUrl: './comment-hook.component.html',
  styleUrl: './comment-hook.component.scss'
})
export class CommentHookComponent implements OnInit, OnChanges, OnDestroy{

  @Input()
  sectionId!: string;

  @Input()
  title: string = '';

  @Input()
  order: number = 0;

  commentSection$!: BehaviorSubject<CommentSection>;

  isEmpty: boolean = false;
  isFocused: boolean = false;
  elementId: string = '';

  constructor(private service: UserProfileServiceService) { }

  ngOnInit() {
    this.elementId = this.sectionId + CommentElementType.Hook;
    this.commentSection$ = this.service.initHook(this.sectionId, this.title, this.order);

    this.commentSection$.subscribe((section) => {
      this.isEmpty = !section.comments.length;
      this.isFocused = !!section.focusedComment;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.commentSection$) {
      return;
    }

    var commentSection = this.commentSection$.value;

    commentSection.title = this.title;
    commentSection.order = this.order;

    this.commentSection$.next(commentSection);

    if(changes['order'].previousValue != changes['order'].currentValue) {
      console.log("order change")
      this.service.triggerSectionUpdate();
      // this.service.updateOrder$.next();
    }
  }

  ngOnDestroy(): void {
    this.service.destroyHook(this.sectionId)
  }

  onClick() {
    this.service.isDrawerOpen = true;
    // document.getElementById(`${this.sectionId}-section`)?.scrollIntoView({});

    if(this.isEmpty) {
      var commentSection = this.commentSection$.value;
      commentSection.isAddComment = true;

      this.commentSection$.pipe(
        take(1),
        delay(10)
      ).subscribe(
        () => {
          this.scrollToHeader();
          this.service.focusComment(this.sectionId);
          this.service.tabIntoComment();
      })
      this.commentSection$.next(commentSection);

    } else {
      this.scrollToHeader();
      this.service.focusComment(this.sectionId, this.commentSection$.value.isAddComment? undefined : this.commentSection$.value.comments[0].commentId);
      this.service.tabIntoComment();
    }

    this.service.returnHook = document.getElementById(this.sectionId + CommentElementType.Hook);
  }

  scrollToHeader() {
    this.service.scrollToSection(this.sectionId);
  }
}
