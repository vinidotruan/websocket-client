import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment.development";
import { Observable } from "rxjs";

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
    return this.http.get<AuthResponse>(`${ environment.apiUrl }/auth/login?code=${code}`)
  }

  get authToken() {
    return localStorage.getItem('token');
  }
}


export class AuthResponse {
  twitch_id: string;
  access_token: string;
  token: string;
  user: any;
}
