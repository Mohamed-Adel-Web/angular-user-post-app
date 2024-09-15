import { Component } from '@angular/core';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NavBarComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-posts-app';
}
