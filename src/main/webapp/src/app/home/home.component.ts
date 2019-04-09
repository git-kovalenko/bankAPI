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

    greeting: any = {
        id: null,
        content: null
    };

    constructor(private authService: AuthService, private router: Router) {}

    authenticated() { return this.authService.authenticated; }

    ngOnInit() {
        if(!this.authenticated()){
            this.router.navigateByUrl('/loginPage');
        }
    }
}
