import { Component, OnInit } from '@angular/core';
import { PrivatBankService } from '../services/privat-bank.service';
import { Observable } from 'rxjs/Observable';
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
    // setTimeout(
    //   () => {
    //     console.log('1sec')
    //     this.merchantData = {"oper":"cmt","info":{"cardbalance":{"card":{"account":"26251622276257980","card_number":"5168755512466752","acc_name":"","acc_type":"","currency":"UAH","card_type":"","main_card_number":"26251622276257980","card_stat":"","src":""},"av_balance":"13606.11","bal_date":"14.03.18 21:52","bal_dyn":"null","balance":"-1393.89","fin_limit":"15000.0","trade_limit":"0.0"}}};
    //     this.card = this.merchantData.info.cardbalance.card;
    //   }, 1000
    // );
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
