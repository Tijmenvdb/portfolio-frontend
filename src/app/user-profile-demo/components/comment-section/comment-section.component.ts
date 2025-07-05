import { Component, Input, OnInit } from '@angular/core';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { CommonModule } from '@angular/common';
import { CommentElementType, CommentSection, UserProfileServiceService } from '../../services/user-profile-service.service';
import { CommentElementService, CommentElementType as ElementType } from '../../services/comment-element.service';
import { BehaviorSubject, delay, take } from 'rxjs';
import { CommentElementDirective } from '../../directives/comment-element.directive';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, CommentCardComponent, CommentElementDirective],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent {
  @Input()
  sectionId!: string;

  @Input()
  commentSection$!: BehaviorSubject<CommentSection>;

  ElementType = ElementType;

  constructor(private service: UserProfileServiceService, private elementService: CommentElementService) { }

  updateAddComment(value: boolean) {
    var commentSection = this.commentSection$.value;
    commentSection.isAddComment = value;
    this.commentSection$.next(commentSection);

    if(!commentSection.isAddComment) {
      return;
    }

    const commentId = commentSection.isAddComment? this.sectionId : commentSection.comments[0].commentId;
    setTimeout(() => this.elementService.jumpToSection(this.sectionId, commentId), 1);
  }

  addComment() {
    this.service.addComment(this.sectionId);

    setTimeout(() => this.elementService.jumpToSection(this.sectionId, this.sectionId), 1);
  }

  cancelComment() {
    this.service.cancelComment(this.sectionId);
  }

  onClickHeader() {
    const commentId = this.commentSection$.value.isAddComment? this.sectionId : this.commentSection$.value.comments[0].commentId;
    if(window.innerWidth <= 600) {
      this.service.isDrawerOpen = false;
      setTimeout(() => {
        this.elementService.jumpToHook(this.sectionId, commentId);
      }, 50)
    } if(window.innerWidth <= 800) {
      this.elementService.jumpToSection(this.sectionId, commentId);
    } else {
      this.elementService.jumpToHook(this.sectionId, commentId);
    }

    // gives the return element to the drawer
    // this.service.returnHook = document.getElementById(this.sectionId + CommentElementType.Hook);
  }
}
