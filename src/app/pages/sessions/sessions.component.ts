import { Component, inject } from "@angular/core";
import { NavbarComponent } from "@shared-components/navbar/navbar.component";
import { SessionsService } from "@services/sessions.service";
import { StopwatchService } from "@services/stopwatch.service";

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
  stopwatch = "";
  ngOnInit() {
    this.stopwatchService.stopwatch$.subscribe({
      next : stopwatch => this.stopwatch = stopwatch
    })
  }


  start() {
    this.service.startSession("1").subscribe({
      next: response => console.log(response)
    })
  }

}
