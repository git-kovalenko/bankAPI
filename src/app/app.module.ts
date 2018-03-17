import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PrivatBankService } from './services/privat-bank.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyRatesComponent } from './aside/currency-rates/currency-rates.component';
import { AsideComponent } from './aside/aside.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MerchantComponent } from './merchant/merchant.component';




@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    CurrencyRatesComponent,
    NavbarComponent,
    MerchantComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
  ],
  providers: [PrivatBankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
