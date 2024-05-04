import { Injectable } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { Observable } from 'rxjs';
import User from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ListandTaskService {

  TOKEN_KEY = "token";

  user: User | null = null;

  constructor(private apiReq: ApiRequestsService) {}

  // List Endpoints

  createList(payload: any): Observable<any> {
    return this.apiReq.post('api/lists', payload);
  }

  updateList(listId: string, updatedData: any): Observable<any> {
    return this.apiReq.put(`api/lists/${listId}`, updatedData);
  }

  getAllLists(): Observable<any> {
    return this.apiReq.get('api/lists');
  }
  getAllListsByEmail(email: string): Observable<any> {
    return this.apiReq.get(`api/lists/by-email/${email}`);
  }

  deleteList(listId: string): Observable<any> {
    return this.apiReq.delete(`api/lists/${listId}`);
  }

  // Task Endpoints

  createTask(listId: string, title: string): Observable<any> {
    return this.apiReq.post(`api/lists/${listId}/tasks`, { title });
  }

  updateTask(taskId: string, updatedData: any): Observable<any> {
    return this.apiReq.put(`api/tasks/${taskId}`, updatedData);
  }

  getTasksForList(listId: string): Observable<any> {
    return this.apiReq.get(`api/lists/${listId}/tasks`);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.apiReq.delete(`api/tasks/${taskId}`);
  }

  toggleTaskCompletion(taskId: string, completed: boolean): Observable<any> {
    return this.apiReq.put(`api/tasks/${taskId}`, { completed });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.apiReq.post('api/register', { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.apiReq.post('api/login', { email, password });
  }

  getUser(email: string): Observable<any> {
    return this.apiReq.get(`api/${email}`);
  }
  
  getName(email: string): Observable<any> {
    return this.apiReq.get(`api/name/${email}`);
  }
  
}
