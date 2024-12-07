import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { StopwatchService } from "@services/stopwatch.service";
import { EchoService } from "./echo.service";
import { User } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  session = new BehaviorSubject<Session>(null);
  currentSession = this.session.asObservable();
  private http = inject(HttpClient)
  private stopWatchService: StopwatchService = inject(StopwatchService);
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
    return this.http.post<Session>(`${environment.apiUrl}/sessions/${sessionId}/start`, {})
    .pipe(tap(response => this.setSession(response)));
  }

  listenEvents() {
    const sessionName = `session.${this.session.getValue().id}`;

    this.echoService.listenPrivateChannel(sessionName, '.session.started', () => this.stopWatchService.start(this.session.getValue().minutes))
    this.echoService.listenPrivateChannel(sessionName, '.session.ended', () => this.stopWatchService.stop());
  }

  setSession(session: Session) {
    console.log(session)
    this.session.next(session);
    const { hours, minutes } = this.stopWatchService.getHoursAndMinutes(session.minutes);
    const timer = this.stopWatchService.getFormattedTimer(hours, minutes, 0);
    this.stopWatchService.stopwatchBehavior.next(timer);
    this.listenEvents();
  }

}

export class Session {
  id: string;
  user_id: string;
  name:string;
  minutes: number;
  rest_minutes: string;
  uri: string;
  on_going: boolean;
  waiting_room: WaitingRoom;
}

export class WaitingRoom {
  id: string;
  session_id: string;
  waiters: User[];

}
