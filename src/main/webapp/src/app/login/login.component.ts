import { Component, OnInit } from '@angular/core';
import { Credentials } from './interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials;
  token;
  constructor(
    private AuthenticationService: AuthService,
  ) {
    this.credentials = {
      email: '',
      login: '',
      password: '',
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.AuthenticationService.login(this.credentials).subscribe(data => {
      this.token = data;
      console.log(data);
    });
  }

}
