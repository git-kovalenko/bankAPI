import { Component, OnInit } from '@angular/core';
import { PrivatBankService } from '../services/privat-bank.service';
import { Payment } from './interfaces';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  merchantData;
  card;
  paymentResponse;
  paymentOptions: Payment;
  disableFields;
  spinner;
  constructor(
    private PBService: PrivatBankService,
  ) {
    this.paymentOptions = {
      cardNumber: null,
      amount: 0,
      details: '',
    };
  }

  ngOnInit() {
    this.getMerchantData();
  }
  getMerchantData() {
    this.PBService.getMerchantData().subscribe(data => {
      this.merchantData = data;
      this.card = this.merchantData.info.cardbalance.card;
      console.log(data);
    });
  }
  onSubmit() {
    this.PBService.payMerchantToPrivat(this.paymentOptions).subscribe(data => {
      this.paymentResponse = data;
      console.log(data);
    });
  }

}
