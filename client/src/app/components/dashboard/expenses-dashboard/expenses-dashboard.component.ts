import {Component, AfterViewInit} from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import {CreateGraph} from '../create-graph';


@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.css']
})

export class ExpensesDashboardComponent implements AfterViewInit {

  @ViewChild('expenseGraph') expensesGraph: ElementRef;
  public totalExpense: number;
  private expenses: number[];
  private otherData: {};

  constructor(private createGraph: CreateGraph) { // TODO Test data, get data from statistics or database?
    this.expenses = [2, 3, 4, 32, 7, 48, 2];
    this.totalExpense = 98;
    this.otherData = {
      name: 'Expenses',
      value: true
    };
  }

  ngAfterViewInit() {
    this.createGraph.createLineGraph(this.expenses, this.expensesGraph, this.otherData);
  }

}
