import {Component, OnInit} from '@angular/core';
import {PrivatBankService} from './services/privat-bank.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  exchangeRates: [] = [];
  constructor(
    private PBService: PrivatBankService
  ) {}
  ngOnInit () {
    this.getCurrencyes();
  }
  getCurrencyes() {
    this.PBService.getRates().subscribe(data => {
      this.exchangeRates = data;
      console.log(data);
    });
  }
}
