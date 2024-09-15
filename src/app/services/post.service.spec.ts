import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostService } from './post.service';
import { IComment } from '../interfaces/icomment';
import { environment } from '../cors/environment/environment';
describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch comments and cache them', () => {
    const postId = 1;
    const mockComments: IComment[] = [
      {
        id: 1,
        postId: 1,
        body: 'Test comment 1',
        email: 'test1@example.com',
        name: 'Test1',
      },
      {
        id: 2,
        postId: 1,
        body: 'Test comment 2',
        email: 'test2@example.com',
        name: 'Test2',
      },
    ];
    service.getComments(postId).subscribe((comments) => {
      expect(comments).toEqual(mockComments);
    });
    const req = httpTestingController.expectOne(
      `${environment.baseUrl}/comments?postId=${postId}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockComments);

    service.getComments(postId).subscribe((comments) => {
      expect(comments).toEqual(mockComments);
    });

    httpTestingController.expectNone(
      `${environment.baseUrl}/comments?postId=${postId}`
    );
  });
  it('should make new HTTP request when fetching comments for a different postId  ', () => {
    const postId1 = 1;
    const postId2 = 2;
    const mockComments1: IComment[] = [
      {
        id: 1,
        postId: 1,
        body: 'Test comment 1',
        email: 'test1@example.com',
        name: 'Test1',
      },
      {
        id: 2,
        postId: 1,
        body: 'Test comment 1',
        email: 'test1@example.com',
        name: 'Test1',
      },
    ];
    const mockComments2: IComment[] = [
      {
        id: 3,
        postId: 2,
        body: 'Test comment 1',
        email: 'test1@example.com',
        name: 'Test1',
      },
      {
        id: 4,
        postId: 2,
        body: 'Test comment 1',
        email: 'test1@example.com',
        name: 'Test1',
      },
    ];

    service.getComments(postId1).subscribe((comments) => {
      expect(comments).toEqual(mockComments1);
    });
    const req1 = httpTestingController.expectOne(
      `${environment.baseUrl}/comments?postId=${postId1}`
    );
    req1.flush(mockComments1);

    service.getComments(postId2).subscribe((comments) => {
      expect(comments).toEqual(mockComments2);
    });
    const req2 = httpTestingController.expectOne(
      `${environment.baseUrl}/comments?postId=${postId2}`
    );
    req2.flush(mockComments2);
  });
});
