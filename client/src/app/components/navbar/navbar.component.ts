import { Component, OnInit, Input } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { AuthService } from 'app/_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @Input() sidenav: MdSidenav;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onLogout(): void {
    this.auth.logout();
  }

}
