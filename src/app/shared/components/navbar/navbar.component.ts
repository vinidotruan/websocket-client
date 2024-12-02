import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@services/auth.service';

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

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.userName = user.display_name;
    this.userPic =  user.profile_image_url;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(["/"])
    });
  }

}
