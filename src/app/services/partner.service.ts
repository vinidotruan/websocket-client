import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private http: HttpClient = inject(HttpClient);

  follow(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/partner`, data);
  }

  unfollow(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/partner/${id}`);
  }
  entered(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/partner/entered`, data)
  }

  leave(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/partner/leave`, data)
  }
}
