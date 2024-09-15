import { IPost } from './../interfaces/ipost';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../cors/environment/environment';
import { shareReplay, catchError } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _HttpClient = inject(HttpClient);
  private usersCache: Observable<IUser[]> | null = null;
  private postsCache: { [userId: number]: Observable<IPost[]> } = {};

  getUsers(): Observable<IUser[]> {
    if (!this.usersCache) {
      this.usersCache = this._HttpClient
        .get<IUser[]>(`${environment.baseUrl}/users`)
        .pipe(shareReplay(1));
    }
    return this.usersCache;
  }

  getUserPosts(userId: number): Observable<IPost[]> {
    if (!this.postsCache[userId]) {
      this.postsCache[userId] = this._HttpClient
        .get<IPost[]>(`${environment.baseUrl}/posts?userId=${userId}`)
        .pipe(shareReplay(1));
    }
    return this.postsCache[userId];
  }
}
