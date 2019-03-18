import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../login/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  public login(credentials: Credentials): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post('https://localhost:443/login', credentials, httpOptions);
  }
}
