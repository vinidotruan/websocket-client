import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  code: string;
  loginURL: string;
  constructor() {
    this.authService.getAuthUrl().subscribe({
      next: (response: any) => {
        this.loginURL = response;
      }
    });

    if(this.authService.authToken) {
      this.router.navigate(['/home']).then()
    }

    if(this.route.snapshot.queryParamMap.get('code')) {
      this.code =this.route.snapshot.queryParamMap.get('code');
      console.log(this.code);
      this.authService.login(this.code).subscribe({
        next: response => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          this.router.navigate(['/home']).then()
        }
      });
    }
  }

}
