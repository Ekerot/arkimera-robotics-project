import { Component, OnInit, Input } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @Input() sidenav: MdSidenav;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.auth.login();
  }

}
