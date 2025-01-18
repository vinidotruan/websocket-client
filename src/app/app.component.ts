import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoadingComponent } from '@shared-components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'websocket-client';
  private authService = inject(AuthService);

  constructor() {
    this.authService.spaAuth().subscribe({
      next: () => {},
      error: err => console.error(err)
    })
  }
}
