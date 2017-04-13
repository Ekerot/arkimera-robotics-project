import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  company: String;

  constructor() {
    this.company = 'Arkimera Robotics AB';  // TODO Get company from API and login
  }
  ngOnInit() {}

}
