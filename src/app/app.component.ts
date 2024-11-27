import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EchoService } from "@services/echo.service";
import { Session, SessionsService } from "@services/sessions.service";
import { StopwatchService } from "@services/stopwatch.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'websocket-client';
  private echoService = inject(EchoService);
  private sessionService = inject(SessionsService)
  private stopwatchService = inject(StopwatchService)

  constructor() {
    this.echoService.listenPrivateChannel(
      'session.1',
      '.session.started',
      (data: Session[]) => {
        this.sessionService.setSession(data[0])
      },
    );
    this.echoService.listenPrivateChannel(
      'session.1',
      '.session.ended',
      () => {
        this.stopwatchService.stop();
      },
    );
  }
}
