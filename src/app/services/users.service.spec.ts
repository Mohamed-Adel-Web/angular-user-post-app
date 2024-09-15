import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { IUser } from '../interfaces/iuser';
import { IPost } from '../interfaces/ipost';
import { environment } from '../cors/environment/environment'
describe('UsersService with Caching', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should fetch users and cache the result', () => {
    const mockUsers: IUser[] = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'amed@gmail.com' },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'amed@gmail.com' },
    ];
    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });
    const req = httpTestingController.expectOne(`${environment.baseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    httpTestingController.expectNone(`${environment.baseUrl}/users`);
  });
  it('should fetch posts for a user and cache the result', () => {
    const userId = 1;
    const mockPosts: IPost[] = [
      { id: 1, userId: 1, title: 'Post 1', body: 'This is the body of post 1' },
      { id: 2, userId: 1, title: 'Post 2', body: 'This is the body of post 2' },
    ];
    service.getUserPosts(userId).subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });
    const req = httpTestingController.expectOne(
      `${environment.baseUrl}/posts?userId=${userId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);

    service.getUserPosts(userId).subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });
    httpTestingController.expectNone(`${environment.baseUrl}/posts?userId=${userId}`);
  });
  it('should make new HTTP request when fetching posts for a different userId', () => {
    const userId1 = 1;
    const userId2 = 2;
    const mockPostsUser1: IPost[] = [
      { id: 1, userId: 1, title: 'Post 1', body: 'This is the body of post 1' },
    ];
    const mockPostsUser2: IPost[] = [
      {
        id: 1,
        userId: 2,
        title: 'Post 1 for user 2',
        body: 'This is the body of post 1 for user 2',
      },
    ];
    service.getUserPosts(userId1).subscribe((posts) => {
      expect(posts).toEqual(mockPostsUser1);
    });
    const req1 = httpTestingController.expectOne(
      `${environment.baseUrl}/posts?userId=${userId1}`
    );
    req1.flush(mockPostsUser1);

    service.getUserPosts(userId2).subscribe((posts) => {
      expect(posts).toEqual(mockPostsUser2);
    });
    const req2 = httpTestingController.expectOne(
      `${environment.baseUrl}/posts?userId=${userId2}`
    );
    req2.flush(mockPostsUser2);
  });
});
