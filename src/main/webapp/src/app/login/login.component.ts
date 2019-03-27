import { Component, OnInit } from '@angular/core';
import { Credentials } from './interfaces';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.credentials = {
      username: "",
      password: "",
    };
  }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.credentials, () => {
      this.router.navigateByUrl("/")
    });
    return false;
  }

}
