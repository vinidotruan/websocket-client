import { Component, inject } from "@angular/core";
import { NavbarComponent } from "@shared-components/navbar/navbar.component";
import { Session, SessionsService } from "@services/sessions.service";
import { NgForOf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private sessionsService = inject(SessionsService)
  private router = inject(Router)
  sessions: Session[] = [];
  constructor() {
    this.sessionsService.listSessions().subscribe({
      next: response => {
        this.sessions = response
      }
    })
  }

  goToSession(session: Session) {
    this.router.navigate(['/session/'+session.uri]).then(() => {
      this.sessionsService.setSession(session)
    })
  }
}
