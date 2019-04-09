import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  dropDown = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onMenuClick() {
    this.collapsed = !this.collapsed;
  }
  onDropDownClick() {
    this.dropDown = !this.dropDown;
  }
  logoutHandler() {
    this.authService.logout(() => {
        this.router.navigateByUrl("/loginPage")
    });
  }
}
