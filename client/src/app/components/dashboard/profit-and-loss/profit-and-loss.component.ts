import { Component, AfterViewInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import {CreateGraph} from '../create-graph';

@Component({
  selector: 'app-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css']
})
export class ProfitAndLossComponent implements AfterViewInit {

  @ViewChild('doughnut') doughnut: ElementRef;
  @ViewChild('container') container: ElementRef;

  private income: number;
  private expense: number;
  public profit: number;

  constructor(public createGraph: CreateGraph) {
    this.income = 68;    // TODO Test data, get data from statistics or database?
    this.expense = 98;
    this.profit = this.income - this.expense;
  }

  ngAfterViewInit() {
    this.createGraph.createDoughnutGraph(this.income, this.expense, this.doughnut); // TODO Does not resize, can´t find any solution for it.
  }


}
