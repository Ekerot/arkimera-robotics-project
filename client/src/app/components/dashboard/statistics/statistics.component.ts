import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

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
  constructor() { }

  ngOnInit() {
  }

}
