import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor() { }

  ngOnInit() {
  }

}
