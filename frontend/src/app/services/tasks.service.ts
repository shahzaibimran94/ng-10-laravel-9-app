import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  user_id?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  comments?: string[]|null;
  members: string[]|null;
  updated_at?: string;
  created_at?: string;
}
export interface TaskResponse {
  status: string;
  tasks: Task[];
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private API_BASE_URL = environment.API_BASE_URL + '/tasks';
  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.get<any>(this.API_BASE_URL, { headers: headers });
  }

  createTask(data: Task): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<any>(this.API_BASE_URL, data, { headers: headers });
  }

  updateTask(id: number, data: Task): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.put<any>(this.API_BASE_URL + '/' + id, data, { headers: headers });
  }

  deleteTask(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.delete<any>(this.API_BASE_URL + '/' + id, { headers: headers });
  }

}
