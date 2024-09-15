import { Component, Input, input } from '@angular/core';
import { IComment } from '../../interfaces/icomment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: IComment = {} as IComment;
  
}
