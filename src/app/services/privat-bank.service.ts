import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class PrivatBankService {
  constructor(
    private http: HttpClient
  ) {}

  public getCurrency(): Observable<any> {
    return this.http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
  }
}
