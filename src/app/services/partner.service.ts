import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  follow(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/partner`, data);
  }

  entered(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/partner/entered`, data)
  }

  leave(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/partner/leave`, data)
  }
}
