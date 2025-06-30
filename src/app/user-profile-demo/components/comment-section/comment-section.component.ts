import { Component, Input, OnInit } from '@angular/core';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { CommonModule } from '@angular/common';
import { CommentElementType, CommentSection, UserProfileServiceService } from '../../services/user-profile-service.service';
import { BehaviorSubject, delay, take } from 'rxjs';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, CommentCardComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent implements OnInit {
  @Input()
  sectionId!: string;

  @Input()
  commentSection$!: BehaviorSubject<CommentSection>;

  elementId: string = '';

  constructor(private service: UserProfileServiceService) {

  }

  ngOnInit(): void {
    this.elementId = this.sectionId + CommentElementType.Section
  }

  updateAddComment(value: boolean) {
    var commentSection = this.commentSection$.value;

    if(commentSection.isAddComment == value) {
      this.service.focusComment(this.sectionId);
      this.service.tabIntoComment();
      return;
    }

    commentSection.isAddComment = value;
    
    if(value) {
      this.commentSection$.pipe(
        take(1),
        delay(10)
      ).subscribe(
        () => {
          this.service.focusComment(this.sectionId);
          this.service.tabIntoComment();
      })
    } else {
      this.commentSection$.pipe(
        take(1),
        delay(10)
      ).subscribe(
        () => {
        this.service.removeFocus();
      })
    }

    this.commentSection$.next(commentSection);
  }

  onClickHeader() {
    if(window.innerWidth <= 600) {
      this.service.isDrawerOpen = false;
      setTimeout(() => {
        this.service.scrollToHook(this.sectionId);
        this.service.scrollToSection(this.sectionId);
      }, 50)
    } else {
      this.service.scrollToHook(this.sectionId);
      this.service.scrollToSection(this.sectionId);
    }

    this.service.focusComment(this.sectionId, this.commentSection$.value.isAddComment? undefined : this.commentSection$.value.comments[0].commentId);
    this.service.tabIntoHook();
    this.service.returnHook = document.getElementById(this.sectionId + CommentElementType.Hook);
  }
}
