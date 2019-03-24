import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private app: AuthService, private http: HttpClient, private router: Router) {
        this.app.authenticate(undefined, undefined);
    }
    logout() {
        this.http.post('logout', {}).finally(() => {
            this.app.authenticated = false;
            this.router.navigateByUrl('/login');
        }).subscribe();
    }
    ngOnInit () {

    }
}
