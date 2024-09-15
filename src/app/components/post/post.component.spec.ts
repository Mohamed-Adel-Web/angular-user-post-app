import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/ipost';
import { IComment } from './../../interfaces/icomment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockComments: IComment[] = [
  {
    id: 1,
    postId: 1,
    name: 'ahmed',
    email: 'ahmed@example.com',
    body: 'This is first comment',
  },
  {
    id: 2,
    postId: 1,
    name: 'mohamed',
    email: 'mohamed@example.com',
    body: 'This is a second comment',
  },
];

const mockPost: IPost = {
  userId: 1,
  id: 1,
  title: 'Post 1',
  body: 'Post body 1',
};
const mockPostService = jasmine.createSpyObj('PostService', ['getComments']);
describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  beforeEach(async () => {
    mockPostService.getComments.and.returnValue(of(mockComments));
    await TestBed.configureTestingModule({
      imports: [PostComponent, HttpClientTestingModule],
      providers: [{ provide: PostService, useValue: mockPostService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should display comments when "showComments" is called', () => {
    fixture.detectChanges();
    const commentElement = fixture.debugElement.query(By.css('button.comment'));
    spyOn(component, 'showComments').and.callThrough();
    commentElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    component.showComments(mockPost.id);
    mockPostService.getComments(mockPost.id).subscribe({
      next: (comments: IComment[]) => {
        expect(comments).toEqual(mockComments);
      },
    });
    expect(component.comments()).toEqual(mockComments);
  });
});
