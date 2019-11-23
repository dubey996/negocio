import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  jobs: Observable<any>;
  constructor(private http: HttpClient) {

  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  getJobs() {
    const url = 'http://localhost:3000/jobs';
    return this.http.get(url)

  }

  postLogin(email: string, password: string): Observable<any> {
    const url = `http://localhost:3000/users/login`;
    return this.http.post(url, { email, password }, { headers: this.headers }).pipe(map(data => data));

  }

  setUser(user): void {
    let userString = JSON.stringify(user);
    localStorage.setItem('setUSer', userString);
  }

  setToken(token): void {
    localStorage.setItem('tk', token);
  }

  getToken() {
    return localStorage.getItem('tk');
  }

  getUser() {
    let user_string = localStorage.getItem('setUser');
    if (isNullOrUndefined) {
      let user = JSON.parse(user_string);

      return user;
    } else {
      return null;
    }
  }
}
