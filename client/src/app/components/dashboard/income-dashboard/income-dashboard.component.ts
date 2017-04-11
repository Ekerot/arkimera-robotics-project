import { Component , AfterViewInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import {CreateGraph} from '../create-graph';

@Component({
  selector: 'app-income-dashboard',
  templateUrl: './income-dashboard.component.html',
  styleUrls: ['./income-dashboard.component.css'],
})
export class IncomeDashboardComponent implements AfterViewInit  {

  @ViewChild('incomeGraph') incomeGraph: ElementRef;
  private totalIncome: number;
  private income: number[];
  private otherData: {};

  constructor(private graph: CreateGraph) { // TODO Test data, get data from statistics or database?
    this.income = [5, 2, 10, 32, 7, 10, 2];
    this.totalIncome = 68;
    this.otherData = {
      name: 'Incomes',
      value: false
    };
  }
  ngAfterViewInit () {
    this.graph.createLineGraph(this.income, this.incomeGraph, this.otherData);
  }

}
