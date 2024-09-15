import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { IPost } from '../../interfaces/ipost';
import { NgOptimizedImage, SlicePipe } from '@angular/common';
import { IComment } from '../../interfaces/icomment';
import { PostService } from '../../services/post.service';
import { CommentComponent } from '../comment/comment.component';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [SlicePipe, CommentComponent, NgOptimizedImage],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly _PostService = inject(PostService);
  @Input() userName: string = '';
  @Input() post: IPost = {} as IPost;
  comments: WritableSignal<IComment[]> = signal([]);
  showComments(postId: number) {
    this._PostService.getComments(postId).subscribe({
      next: (data) => {
        this.comments.set(data);
      },
    });
  }
}
