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
  private service: StopwatchService = inject(StopwatchService);
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
    .pipe(tap((session: Session) => {
        this.setSession(session);
        this.setTimer(session.minutes);
        this.listenEvents();
    }));
  }

  startSession(sessionId: string) {
    return this.http.post<Session>(`${environment.apiUrl}/sessions/${sessionId}/start`, {});
  }

  listenEvents() {
    const sessionName = `session.${this.session.getValue().id}`;
    const time = this.session.getValue().minutes;
    this.echoService.listenPrivateChannel(sessionName, '.session.started', (session) => {
      this.service.start(time);
      this.setSession(session)
    })
    this.echoService.listenPrivateChannel(sessionName, '.session.ended', (session) => {
      this.service.stop();
      this.setSession(session);
    });
  }

  setSession(session: Session) {
    this.session.next(session);
  }

  setTimer(sessionMinutes: number) {
    const { hours, minutes } = this.service.getHoursAndMinutes(sessionMinutes);
    const timer = this.service.getFormattedTimer(hours, minutes, 0);
    this.service.stopwatchBehavior.next(timer)
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
  pivot?: any;
}

export class WaitingRoom {
  id: string;
  session_id: string;
  waiters: User[];

}
