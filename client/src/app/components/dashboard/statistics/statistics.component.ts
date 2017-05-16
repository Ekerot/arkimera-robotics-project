import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../_services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public hitRate: number;
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.hitRate = this.statisticsService.statsticsCalculation();
    console.log((this.hitRate * 100)+'%');
  }

}
