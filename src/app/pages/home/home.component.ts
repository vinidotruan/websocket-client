import { Component, inject } from "@angular/core";
import { NavbarComponent } from "@shared-components/navbar/navbar.component";
import { Session, SessionsService } from "@services/sessions.service";
import { NgForOf, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgIf,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private sessionsService = inject(SessionsService)
  private router = inject(Router)
  private authService = inject(AuthService)

  currentUser = this.authService.user

  sessions: Session[] = [];
  constructor() {
    this.sessionsService.listSessions().subscribe({
      next: response => {
        this.sessions = response
      }
    })
  }

  goToSession(session: Session) {
    this.router.navigate(['/session/'+session.uri]);
  }

  goToCreateSession() {
    this.router.navigate(['/session']);
  }
}
