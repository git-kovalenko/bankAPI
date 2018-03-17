import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  dropDown = false;
  constructor() { }

  ngOnInit() {
  }
  onMenuClick() {
    this.collapsed = !this.collapsed;
  }
  onDropDownClick() {
    this.dropDown = !this.dropDown;
  }
}
