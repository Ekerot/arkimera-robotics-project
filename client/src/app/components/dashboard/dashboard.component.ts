import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recents = [ // TODO Get statistics from the API and recent from web API or?
    {name: 'info',
      time: '2.82',
      accuracy: '98%'
    },
    {name: 'info',
      time: '2.82',
      accuracy: '98%'
    },
    {name: 'info',
      time: '2.82',
      accuracy: '98%'
    },
  ];
  company: String = 'Arkimera Robotics AB'; // TODO Get company from API and login component
  constructor() { }

  ngOnInit() {
  }

}
