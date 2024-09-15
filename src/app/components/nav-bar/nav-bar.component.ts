import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IPost } from '../../interfaces/ipost';
import { PostComponent } from '../post/post.component';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PostComponent, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  private readonly _UserService = inject(UsersService);
  usersData: WritableSignal<IUser[]> = signal([]);
  usersPosts: WritableSignal<IPost[]> = signal([]);
  userName: WritableSignal<string> = signal('');
  ngOnInit(): void {
    this._UserService.getUsers().subscribe({
      next: (data) => {
        this.usersData.set(data);
      },
    });
  }
  loadUserPosts(user: IUser) {
    this.setUserName(user.username);

    this._UserService.getUserPosts(user.id).subscribe({
      next: (data) => {
        this.usersPosts.set(data);
      },
    });
  }
  setUserName(name: string): void {
    this.userName.set(name);
  }
  getUserName(): string {
    return this.userName();
  }
}
