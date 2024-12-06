import { Component, inject } from "@angular/core";
import { NavbarComponent } from "@shared-components/navbar/navbar.component";
import { Session, SessionsService } from "@services/sessions.service";
import { StopwatchService } from "@services/stopwatch.service";
import { EchoService } from "@services/echo.service";
import { AuthService } from "@services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { PartnerService } from "@services/partner.service";
import { JsonPipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [
    NavbarComponent,
    JsonPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {
  private service = inject(SessionsService)
  private stopwatchService = inject(StopwatchService)
  private authService = inject(AuthService);
  private partnerService = inject(PartnerService);
  private activatedRoute = inject(ActivatedRoute);
  private echoService: EchoService = inject(EchoService);

  currentSession: Session;
  stopwatch = "";
  waiters: any[];

  ngOnInit() {
    const routeUri = this.activatedRoute.snapshot.paramMap.get('uri');
    this.service.searchSession(routeUri).subscribe({
      next: session => {
        this.currentSession = session;
        if(this.isFollowing()) {
          this.notifyFollowerEntered();
        }
        if(this.isOwner()) {
          this.listenFollowers();
        }
      }
    });

    this.stopwatchService.stopwatch$.subscribe({
      next : stopwatch => this.stopwatch = stopwatch
    })

  }

  notifyFollowerEntered() {
    const data = {
      partner_id: this.authService.user.id,
      session_id: this.currentSession.id
    }
    this.partnerService.entered(data).subscribe({
      next: () => console.log("plau")
    });
  }

  start() {
    this.service.startSession(this.currentSession.id).subscribe({
      next: response => console.log(response)
    })
  }

  isOwner() {
    return this.currentSession?.user_id === this.authService?.user?.id;
  }

  isFollowing(): boolean {
    return !!this.authService.user?.followed_sessions.find(
      (session: Session) => this.currentSession?.id === session.id
    );
  }

  follow() {
      this.partnerService.follow({
        partner_id: this.authService.user.id,
        session_id: this.currentSession.id
      }).subscribe({
        next: response => console.log(response)
      })
  }

  private listenFollowers() {
    const sessionName = `session.${this.currentSession.id}`;
    this.echoService.listenPrivateChannel(
      sessionName,
      '.session.partner-entered',
      (data) => {
        this.waiters = data;
      }
    )
    this.echoService.listenPrivateChannel(
      sessionName,
      '.session.partner-leaved',
      (data) => {
        console.log(data)
        this.waiters = data;
      }
    )

  }

  ngOnDestroy() {
    if(!this.isOwner()) {
      this.partnerService.leave({
        partner_id: this.authService.user.id,
        session_id: this.currentSession.id
      }).subscribe({
        next: response => console.log(response)
      });
    }
  }


}
