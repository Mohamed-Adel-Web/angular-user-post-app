import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { UsersService } from '../../services/users.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { IUser } from '../../interfaces/iuser';
import { IPost } from '../../interfaces/ipost';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockUsersService: jasmine.SpyObj<UsersService>;

  const mockUsers: IUser[] = [
    { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
    },
  ];

  const mockPosts: IPost[] = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Post body 1' },
    { userId: 1, id: 2, title: 'Post 2', body: 'Post body 2' },
  ];
  mockUsersService = jasmine.createSpyObj('UsersService', [
    'getUsers',
    'getUserPosts',
  ]);

  beforeEach(async () => {
    mockUsersService.getUsers.and.returnValue(of(mockUsers));
    mockUsersService.getUserPosts.and.returnValue(of(mockPosts));

    await TestBed.configureTestingModule({
      imports: [NavBarComponent, HttpClientTestingModule],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load users on init', () => {
    mockUsersService.getUsers().subscribe({
      next: (users) => {
        expect(users).toEqual(mockUsers);
      },
    });
    expect(component.usersData()).toEqual(mockUsers);
    const userELements = fixture.debugElement.queryAll(By.css('li'));
    expect(userELements.length).toBe(mockUsers.length);
  });
  it('should load user posts when user is clicked', () => {
    const firstUserElement = fixture.debugElement.query(By.css('li'));
    spyOn(component, 'loadUserPosts').and.callThrough();
    firstUserElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    component.loadUserPosts(mockUsers[0]);
    mockUsersService.getUserPosts(mockUsers[0].id).subscribe({
      next: (posts) => {
        expect(posts).toEqual(mockPosts);
      },
    });
    expect(component.usersPosts()).toEqual(mockPosts);
  });
  it('should set the selected username when a user i clicked', () => {
    const firstElement = fixture.debugElement.query(By.css('li'));
    spyOn(component, 'setUserName').and.callThrough();
    firstElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    component.setUserName(mockUsers[0].username);
    expect(component.getUserName()).toBe(mockUsers[0].username);
  });
});
