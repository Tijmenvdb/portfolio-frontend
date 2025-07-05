import { Directive, ElementRef, Input } from '@angular/core';
import { CommentElementService, CommentElementType } from '../services/comment-element.service';

@Directive({
  selector: '[commentElement]'
})
export class CommentElementDirective {
  @Input('commentElement') elementType!: CommentElementType;
  @Input('elementId') id?: string;

  constructor(private elementRef: ElementRef, private commentService: CommentElementService) {}

  ngAfterViewInit() {
    this.commentService.registerElement(this.elementType, this.elementRef.nativeElement, this.id);
  }

  ngOnDestroy() {
    this.commentService.deregisterElement(this.elementType, this.id);
  }

}
