import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { JobsInterface } from '../interfaces/jobs';
import { UserInterface } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }
  job: Observable<any>;
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerJobs(job: JobsInterface) {
    let token = this.getToken();

    const url = `http://localhost:3000/jobs`;
    let headerss = new HttpHeaders({
      "authorization": "Bearer" + " " + token,
      "Content-Type": "application/json"
    });
    console.log(token);
    console.log(url, job, { headers: headerss });
    return this.http.post<JobsInterface>(url, job, { headers: headerss }).pipe(map(data => data));
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

  getUser(): UserInterface {
    let user_string = localStorage.getItem('setUSer');
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);

      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    let accesToken = localStorage.getItem('tk');
    //falta el metodo en el apli para hacer el logout
    localStorage.removeItem('tk');
    localStorage.removeItem('setUSer');
  }
}
