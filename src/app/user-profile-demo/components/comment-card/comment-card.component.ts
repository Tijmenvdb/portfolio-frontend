import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, CommentElementType, UserProfileServiceService } from '../../services/user-profile-service.service';

@Component({
  selector: 'app-comment-card',
  imports: [CommonModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent implements OnInit, AfterViewInit {
  @Input()
  sectionId!: string;

  @Input()
  comment?: Comment;

  @Output()
  create: EventEmitter<any> = new EventEmitter();

  @Output()
  cancelCreate: EventEmitter<void> = new EventEmitter();

  @Output()
  reply: EventEmitter<any> = new EventEmitter();

  isReplyEnabled = false;

  elementId: string = '';

  constructor(private service: UserProfileServiceService) {

  }

  ngOnInit(): void {
    this.elementId = (this.comment? this.comment.commentId : this.sectionId) + CommentElementType.Comment;
  }

  ngAfterViewInit(): void {
    const commentContainer = document.getElementById(this.elementId);
    commentContainer?.addEventListener('focusin', () => {
      console.log("Focused In")
      this.service.focusComment(this.sectionId, this.comment? this.comment?.commentId : undefined);
    });

    commentContainer?.addEventListener('focusout', () => {
      console.log("Focused Out")
      if (!commentContainer.contains(document.activeElement)) {
        this.service.removeFocus();
      }
    });
  }

  onClick() {
    this.service.focusComment(this.sectionId, this.comment? this.comment?.commentId : undefined);
  }

  onReply() {
    this.isReplyEnabled = true;
    setTimeout(() => this.service.tabIntoComment());
  }

  onCancelReply() {
    this.isReplyEnabled = false;
    setTimeout(() => this.service.tabIntoComment());
  }

  // Date to relative time function
}
