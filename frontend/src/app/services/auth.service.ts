import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Credentials {
  email: string;
  password: string;
}
export interface AuthResponse {
  status: boolean;
  message: string;
  token: string;
}
export interface RegisterFormData {
  name: string;
  emails: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_BASE_URL = environment.API_BASE_URL + '/auth';
  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<any> {
    return this.http.post<any>(this.API_BASE_URL + '/login', credentials);
  }

  register(data: RegisterFormData): Observable<any> {
    return this.http.post<any>(this.API_BASE_URL + '/register', data);
  }

  logout(): Promise<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<any>(this.API_BASE_URL + '/logout', null, { headers: headers }).toPromise();
  }
  
  getMembers(): Promise<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get<any>(environment.API_BASE_URL + '/users', { headers: headers }).toPromise();
  }

  getUser(): Promise<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get<any>(environment.API_BASE_URL + '/user', { headers: headers }).toPromise();
  }
  
  validateToken(): Promise<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get(environment.API_BASE_URL + '/user', { headers: headers }).toPromise();
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token)
      return false;
    return true;
  }

  getFullName(first_name: string, last_name: string): string {
    return `${first_name} ${last_name}`;
  }

}
