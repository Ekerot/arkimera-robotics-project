import { Component , AfterViewInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import {CreateGraph} from '../create-graph';
import { StatisticsService } from '../../../_services/statistics.service';

@Component({
  selector: 'app-income-dashboard',
  templateUrl: './income-dashboard.component.html',
  styleUrls: ['./income-dashboard.component.css'],
})
export class IncomeDashboardComponent implements AfterViewInit  {

  @ViewChild('incomeGraph') incomeGraph: ElementRef;
  public totalIncome: number;
  private income: number[];
  private otherData: {};

  constructor(private graph: CreateGraph, private statisticsService: StatisticsService) { // TODO Test data, get data from statistics or database?
    this.income = [5, 2, 10, 32, 7, 10, 2];
    this.otherData = {
      name: 'Incomes',
      value: false
    };
  }
  ngAfterViewInit () {
    this.totalIncome = this.statisticsService.getTotalIncome();
    this.graph.createLineGraph(this.income, this.incomeGraph, this.otherData);
  }

}
