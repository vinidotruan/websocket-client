import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userName: string;
  userPic: string;

  constructor() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    this.userName = user.display_name;
    this.userPic =  user.profile_image_url;
  }

}
