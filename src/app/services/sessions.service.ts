import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment.development";
import { BehaviorSubject, map, Observable, Subject, tap } from "rxjs";
import { StopwatchService } from "@services/stopwatch.service";
import { EchoService } from "./echo.service";

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  session = new BehaviorSubject<Session>(null);
  currentSession = this.session.asObservable();
  private http = inject(HttpClient)
  private stopWatchService = inject(StopwatchService);
  private echoService = inject(EchoService);

  constructor() { }

  createSession(session: any): Observable<Session> {
    return this.http.post<Session>(`${environment.apiUrl}/sessions`, session);
  }

  listSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${environment.apiUrl}/sessions`)
  }

  searchSession(uri: string): Observable<Session> {
    return this.http.get<Session>(`${environment.apiUrl}/sessions/${uri}`)
    .pipe(tap((session: Session) => { this.setSession(session); }));
  }

  startSession(sessionId: string) {
    return this.http.post(`${environment.apiUrl}/sessions/${sessionId}/start`, {});
  }

  listenEvents() {
    const sessionName = `session.${this.session.getValue().id}`;

    this.echoService.listenPrivateChannel(sessionName, '.session.started', () => this.stopWatchService.start())
    this.echoService.listenPrivateChannel(sessionName, '.session.ended', () => this.stopWatchService.stop());
  }

  setSession(session: Session) {
    this.session.next(session);
    this.listenEvents();
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
