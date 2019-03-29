import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    title = 'Demo';
    greeting: any = {
        id: null,
        content: null
    };

    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
        http.get('resource').subscribe(data  => this.greeting = data);
    }

    authenticated() { return this.authService.authenticated; }

    ngOnInit() {
        if(!this.authenticated()){
            this.router.navigateByUrl('/username');
        }
    }
    navigateBy
}
