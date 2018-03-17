import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../merchant/interfaces';

@Injectable()
export class PrivatBankService {
  constructor(
    private http: HttpClient
  ) {}

  public getRates(): Observable<any> {
    return this.http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
  }

  public getMerchantData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post('/ballance', {}, httpOptions);
  }

  public payMerchantToPrivat(paymentOptions: Payment): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type':  'application/json',
      })
    };
    return this.http.post('/payMerchantToPrivat', paymentOptions, httpOptions);
  }
}
