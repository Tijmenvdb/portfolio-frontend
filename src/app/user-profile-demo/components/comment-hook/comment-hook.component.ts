import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommentElementType, CommentSection, UserProfileServiceService } from '../../services/user-profile-service.service';
import { BehaviorSubject, delay, take } from 'rxjs';
import { CommentElementDirective } from '../../directives/comment-element.directive';
import { CommentElementService, CommentElementType as ElementType } from '../../services/comment-element.service';

@Component({
  selector: 'app-comment-hook',
  imports: [CommentElementDirective],
  templateUrl: './comment-hook.component.html',
  styleUrl: './comment-hook.component.scss'
})
export class CommentHookComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  sectionId!: string;

  @Input()
  title: string = '';

  @Input()
  order: number = 0;

  ElementType = ElementType;

  commentSection$!: BehaviorSubject<CommentSection>;

  isEmpty: boolean = false;

  constructor(private service: UserProfileServiceService, private elementService: CommentElementService) { }

  ngOnInit() {
    this.commentSection$ = this.service.initHook(this.sectionId, this.title, this.order);

    this.commentSection$.subscribe((section) => {
      this.isEmpty = !section.comments.length || (section.comments.length == 1 && !!section.comments[0].isNew);
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
    }
  }

  ngOnDestroy(): void {
    this.service.destroyHook(this.sectionId)
  }

  onClick() {
    this.service.isDrawerOpen = true;

    var commentSection = this.commentSection$.value;

    if(this.isEmpty) {
      this.service.addComment(this.sectionId);
    }
    
    const commentId = commentSection.isAddComment? this.sectionId : commentSection.comments[0].commentId;
    setTimeout(() => this.elementService.jumpToSection(this.sectionId, commentId), 1);
  }
}
