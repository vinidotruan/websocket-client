import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)

  constructor() {}

  getAuthUrl() {
    return this.http.get(`${ environment.apiUrl }/auth/url`);
  }

  login(code: string): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${ environment.apiUrl }/auth/login?code=${code}`);
  }

  logout(): Observable<any> {
    return this.http.post(`${ environment.apiUrl }/auth/logout`, {}).pipe(tap(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }));
  }

  spaAuth() {
    return this.http.get(`${ environment.authSpa }`, { observe: "response"});
  }

  get authToken() {
    return localStorage.getItem('token');
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }
}


export class AuthResponse {
  twitch_id: string;
  access_token: string;
  token: string;
  user: any;
}
