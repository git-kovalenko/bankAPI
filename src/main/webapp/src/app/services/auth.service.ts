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

  authenticate(credentials: Credentials, callback) {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });
  }

  // public login(credentials: Credentials): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       // 'Content-Type': 'application/x-www-form-urlencoded'
  //     })
  //   };
  //   return this.http.post('https://localhost:443/username', credentials, httpOptions);
  // }
}
