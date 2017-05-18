import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../_services/statistics.service';
import { HttpService } from '../../../_services/http.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public hitRate: number;
  constructor(private statisticsService: StatisticsService, private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getBookedFiles()
      .subscribe(res => {
    this.hitRate = this.statisticsService.statsticsCalculation(res);
    console.log((this.hitRate * 100) + '%');
      }, error => {
        console.log(error);
      })
  }

}
