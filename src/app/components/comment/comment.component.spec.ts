import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { IComment } from '../../interfaces/icomment';
import { By } from '@angular/platform-browser';

const mockComment: IComment = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  body: 'This is a comment.',
  postId: 1,
};
describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
-
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = mockComment;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should display comment user name ', () => {
    const nameElement = fixture.debugElement.query(
      By.css('.comment-name')
    ).nativeElement;
    expect(nameElement.textContent).toContain(mockComment.name);
  });
  it('should display comment user email', () => {
    const emailElement = fixture.debugElement.query(
      By.css('.comment-email')
    ).nativeElement;
    expect(emailElement.textContent).toContain(mockComment.email);
  });
  it('should display the comment body', () => {
    const bodyElement = fixture.debugElement.query(
      By.css('.comment-body')
    ).nativeElement;
    expect(bodyElement.textContent).toContain(mockComment.body);
  });

  it('should display the correct image URL based on comment ID', () => {
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain(
      `https://loremflickr.com/60/60?random=${mockComment.id}`
    );
  });
});
