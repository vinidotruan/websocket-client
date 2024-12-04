import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { SessionsService } from '@services/sessions.service';
import { NavbarComponent } from '@shared-components/navbar/navbar.component';

@Component({
  selector: 'app-sessions-form',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sessions-form.component.html',
  styleUrl: './sessions-form.component.scss'
})
export class SessionsFormComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    uri: new FormControl("", [Validators.required]),
    time: new FormControl("00:00", [Validators.required]),
    rest_time: new FormControl("00:00", [Validators.required]),
    user_id: new FormControl(null, [Validators.required])
  });

  private authService: AuthService = inject(AuthService);
  private sessionService: SessionsService = inject(SessionsService);
  private router: Router = inject(Router);

  constructor() {
    this.form.patchValue({ user_id: this.authService.user.id })
  }

  save() {
    const { time, rest_time } = this.form.value;
    const data = {
      ...this.form.value,
      minutes: this.toMinutes(time),
      rest_minutes: this.toMinutes(rest_time)
    };
    this.sessionService.createSession(data).subscribe({
      next: response => this.router.navigate(['/'])
    });
  }

  private toMinutes(time: string): number {
    if (time.length < 5) {
      return 0;
    }
    const splittedTime = time.split(":");
    const hourInMinutes = Number(splittedTime[0]) * 60;
    return hourInMinutes + Number(splittedTime[1]);
  }
}
