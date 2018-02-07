import {Component, OnInit} from '@angular/core';
import { PrivatBankService } from '../../services/privat-bank.service';


@Component({
  selector: 'app-currency-rates',
  templateUrl: './currency-rates.component.html',
  styleUrls: ['./currency-rates.component.scss']
})
export class CurrencyRatesComponent implements OnInit {
  exchangeRates = [];
  constructor(
    private PBService: PrivatBankService
  ) { }

  ngOnInit() {
    this.getCurrencyes();
  }
  getCurrencyes() {
    this.PBService.getRates().subscribe(data => {
      this.exchangeRates = data;
      console.log(data);
    });
  }
}
