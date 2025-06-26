import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  imports: [CommonModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {
  @Input()
  comment: any;

  @Output()
  create: EventEmitter<any> = new EventEmitter();

  @Output()
  cancelCreate: EventEmitter<void> = new EventEmitter();

  @Output()
  reply: EventEmitter<any> = new EventEmitter();

  isReplyEnabled = false;

  // Date to relative time function
}
