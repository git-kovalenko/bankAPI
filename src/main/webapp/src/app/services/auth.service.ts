import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../login/interfaces';

@Injectable()
export class AuthService {
  authenticated = false;
  constructor(
    private http: HttpClient
  ) {}

  authenticate(credentials: Credentials, callback: Function) {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
        return typeof callback === "function" ? callback() : true;
      }
      this.authenticated = false;
      return null;
    });
  }
  logout(callback: Function) {
      this.http.post('logout', {}).finally(() => {
          this.authenticated = false;
          return typeof callback === "function" ? callback() : true;
      }).subscribe();
  }
}
