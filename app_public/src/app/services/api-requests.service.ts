import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from "../models/user.model";
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  
  readonly ROOT_URL;

  TOKEN_KEY = "token";
  EMAIL_KEY = "email"
  NAME_KEY = "name";

  user: User | null = null;
  userListener: Subject<User | null> = new Subject();

  API_URL = "http://localhost:3006/api/";

  constructor(private http: HttpClient, private router: Router) {
    this.ROOT_URL = 'http://localhost:3006';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri: string, payload: Object) {
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  register({ user, password }: { user: User, password: string }): Observable<{ token: string, user: User } | { error: any }> {
    return this.http.post<{ token: string, user: User } | { error: any }>(
        `${this.API_URL}register`,
        { email: user.email, password }
    );
}

  login({email, password}: {email: string, password: string}): Observable<{ token: string, user: User } | { error: any }> {
    return this.http.post<{ token: string, user: User } | { error: any }>(
        `${this.API_URL}login`,
        { email, password }
    );
}
  isLoggedIn(): boolean {
      return this.user !== null;
  }

  getUser(): User | null {
      return this.user;
  }

  getUserListener(): Observable<User | null> {
      return this.userListener.asObservable();
  }


  retrieveUser(email: string): void {
      this.http.get<User | null>(this.API_URL + email)
          .subscribe((user: User | null) => {
              if (user) {
                  this.user = user;
                  this.userListener.next(user);
              }
          });
  }

  logout() {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.EMAIL_KEY);
      localStorage.removeItem(this.NAME_KEY);
      this.user = null;
      this.userListener.next(null);
      this.router.navigate([`/login`]);
  }


}