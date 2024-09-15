import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../interfaces/icomment';
import { environment } from '../cors/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly _HttpClient = inject(HttpClient);
  private commentCash: { [postId: number]: Observable<IComment[]> } = {};
  getComments(postId: number): Observable<any> {
    if (!this.commentCash[postId]) {
      this.commentCash[postId] = this._HttpClient
        .get<IComment[]>(`${environment.baseUrl}/comments?postId=${postId}`)
        .pipe(shareReplay(1));
    }
    return this.commentCash[postId];
  }
}
