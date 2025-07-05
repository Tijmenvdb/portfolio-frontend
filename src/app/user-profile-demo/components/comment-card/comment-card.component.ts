import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Comment, CommentElementType, UserProfileServiceService } from '../../services/user-profile-service.service';
import { CommentElementDirective } from '../../directives/comment-element.directive';
import { CommentElementService, CommentElementType as ElementType } from '../../services/comment-element.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-card',
  imports: [CommonModule, CommentElementDirective, FormsModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {

  @HostListener('focusin', ['$event'])
  focus: Function = this.focusHandler;

  @ViewChild('commentCard') commentCard!: ElementRef<HTMLElement>;

  @ViewChild('replyInput') replyInput!: ElementRef<HTMLElement>;

  @ViewChild('replyButton') replyButton!: ElementRef<HTMLElement>;

  @Input()
  sectionId!: string;

  @Input()
  comment!: Comment;

  message: string = '';

  @Output()
  send: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  ElementType = ElementType;

  isReplyEnabled = false;

  constructor(private elementService: CommentElementService, private dataService: UserProfileServiceService) { }

  focusHandler() {
    this.elementService.focus(this.sectionId, this.comment.commentId);
  }

  onReply() {
    this.isReplyEnabled = true;
    setTimeout(() => this.replyInput.nativeElement.focus({preventScroll: true}), 1);
  }

  onCancelReply() {
    this.isReplyEnabled = false;
    
    // Make a generic focus first function
    setTimeout(() => this.replyButton.nativeElement.focus({preventScroll: true}), 1);
  }

  // Date to relative time function

  
  onSend() {
    if(!this.message) {
      return;
    }

    this.comment.message = this.message;
    this.dataService.sendComment(this.comment).subscribe((comment) => {
      this.message = '';
      this.comment = comment;
      this.dataService.updateSection(this.sectionId);
      this.elementService.deregisterElement(ElementType.Comment, this.sectionId);
      this.elementService.registerElement(ElementType.Comment, this.commentCard.nativeElement, comment.commentId);
    });
  }

  onSendReply() {
    if(!this.message) {
      return;
    }

    var comment = this.dataService.getNewComment(this.sectionId);
    comment.message = this.message;

    this.dataService.sendComment(comment).subscribe((comment) => {
      this.message = '';
      this.isReplyEnabled = false;
      this.comment.replies.unshift(comment);
      this.dataService.updateSection(this.sectionId);
    });
  }
}
