import { Pipe, PipeTransform } from '@angular/core';
import { CommentSection } from '../services/user-profile-service.service';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'commentSectionOrder'
})
export class CommentSectionOrderPipe implements PipeTransform {

  transform(map: Map<string, BehaviorSubject<CommentSection>>): {sectionId: string, commentSection$: BehaviorSubject<CommentSection>}[] {
    console.log("Sorting Elements: ", Array.from(map.entries()))

    const sortedList = Array.from(map.entries()).sort(
      ([, a], [, b]) => a.value.order - b.value.order 
    ).map(
      ([id, section$]) => ({ sectionId: id, commentSection$: section$ })
    );

    return sortedList;
  }

}
