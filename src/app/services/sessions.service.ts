import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment.development";
import { map, Observable, Subject } from "rxjs";
import { StopwatchService } from "@services/stopwatch.service";

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private http = inject(HttpClient)
  private stopWatchService = inject(StopwatchService);
  session = new Subject<Session>();
  currentSession = this.session.asObservable();
  constructor() { }

  listSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${environment.apiUrl}/sessions`)
  }

  startSession(sessionId: string) {
    return this.http.post(`${environment.apiUrl}/sessions/${sessionId}/start`, {})
    .pipe(map(response => {
      this.stopWatchService.start();
    }))
  }
  setSession(session: Session) {
    this.session.next(session);
  }

}

export class Session {
  id: string;
  user_id: string;
  name:string;
  minutes: string;
  rest_minutes: string;
  uri: string;
  counter: string;
}
