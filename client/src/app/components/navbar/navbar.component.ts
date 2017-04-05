import { Component, OnInit, Input } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() sidenav: MdSidenav;

  constructor() { }

  ngOnInit() {
  }

}
