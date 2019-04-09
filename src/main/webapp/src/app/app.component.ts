import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import "rxjs/add/operator/finally";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private auth: AuthService, private router: Router) {
        this.auth.authenticate(undefined, () => {
            this.router.navigateByUrl("/")
        });
    }
    ngOnInit () {

    }
}
