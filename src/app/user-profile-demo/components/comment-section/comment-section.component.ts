import { Component, Input } from '@angular/core';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, CommentCardComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent {
  isAddComment: boolean = false;

  @Input()
  title: string = ''

  @Input()
  comments: any[] = [];

}
