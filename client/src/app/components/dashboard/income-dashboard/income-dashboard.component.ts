import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import {CreateGraph} from '../create-graph';
import { StatisticsService } from '../../../_services/statistics.service';
import { HttpService } from '../../../_services/http.service';
import { GraphRequest } from '../../../_models/graphRequest';

@Component({
  selector: 'app-income-dashboard',
  templateUrl: './income-dashboard.component.html',
  styleUrls: ['./income-dashboard.component.css'],
})
export class IncomeDashboardComponent implements OnInit, AfterViewInit  {

  @ViewChild('incomeGraph') incomeGraph: ElementRef;
  public totalIncome: number;
  public totalProfit: number;
  private income: GraphRequest [];
  private otherData: {};

  constructor(private graph: CreateGraph, private statisticsService: StatisticsService, private httpService: HttpService) {
    this.otherData = {
      name: 'Incomes',
      value: false
    };
  }
  ngOnInit() {
  }
  ngAfterViewInit () {
    this.httpService.getBookedFiles()
      .subscribe(res => {
      this.income = this.statisticsService.getIncomes(res);
      this.totalIncome = this.statisticsService.getTotalIncome();
      this.graph.createLineGraph(this.income, this.incomeGraph, this.otherData);
      }, error => {
        console.log(error);
      })
  }

}
