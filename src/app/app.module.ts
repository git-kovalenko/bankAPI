import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrivatBankService } from './services/privat-bank.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyRatesComponent } from './aside/currency-rates/currency-rates.component';
import { AsideComponent } from './aside/aside.component';




@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    CurrencyRatesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
  ],
  providers: [PrivatBankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
