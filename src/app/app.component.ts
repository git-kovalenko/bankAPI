import {Component, OnInit} from '@angular/core';
import {PrivatBankService} from "./services/privat-bank.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    private PBService: PrivatBankService
  ) {}
  ngOnInit () {
    this.PBService.getCurrency().subscribe(data => {
      console.log(data);
    });
  }
}
