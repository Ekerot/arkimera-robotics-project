import { Component, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef} from '@angular/core';
import { CreateGraph } from '../create-graph';
import { HttpService } from '../../../_services/http.service';
import { StatisticsService } from '../../../_services/statistics.service';

@Component({
  selector: 'app-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css']
})
export class ProfitAndLossComponent implements AfterViewInit {

  @ViewChild('doughnut') doughnut: ElementRef;
  @ViewChild('container') container: ElementRef;
  public profit: number;
  public expenses = [];

  constructor(public createGraph: CreateGraph, private statisticsService: StatisticsService, private httpService: HttpService) {
  }

  ngAfterViewInit() {
    this.httpService.getBookedFiles()
      .subscribe(res => {
        this.profit = this.statisticsService.getTotalProfit(res);
        this.createGraph.createDoughnutGraph(this.statisticsService.getTotalIncome(),
          this.statisticsService.getTotalExpense(), this.doughnut);
      }, error => {
        console.log(error);
      })

  }
}
