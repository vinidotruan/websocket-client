import { Component, inject } from "@angular/core";
import { NavbarComponent } from "@shared-components/navbar/navbar.component";
import { Session, SessionsService } from "@services/sessions.service";
import { StopwatchService } from "@services/stopwatch.service";
import { EchoService } from "@services/echo.service";
import { AuthService } from "@services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {
  private service = inject(SessionsService)
  private stopwatchService = inject(StopwatchService)
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);

  currentSession: Session;
  stopwatch = "";

  ngOnInit() {
    if(!this.service.session.getValue()) {
      const routeUri = this.activatedRoute.snapshot.paramMap.get('uri');
      this.service.searchSession(routeUri).subscribe({
        next: session => this.currentSession = session
      });
    } else {
      this.currentSession = this.service.session.getValue();
    }

    this.service.currentSession.subscribe({
      next: session => this.currentSession = session
    })

    this.stopwatchService.stopwatch$.subscribe({
      next : stopwatch => this.stopwatch = stopwatch
    })
  }


  start() {
    this.service.startSession("1").subscribe({
      next: response => console.log(response)
    })
  }

  isOwner() {
    return this.currentSession?.user_id === this.authService?.user?.id;
  }


}
