import {Component, AfterViewInit} from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import {CreateGraph} from '../create-graph';
import { StatisticsService } from '../../../_services/statistics.service';


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

  constructor(private createGraph: CreateGraph, private statisticsService: StatisticsService) {
    this.otherData = {
      name: 'Expenses',
      value: true
    };
  }

  ngAfterViewInit() {
    this.totalExpense = this.statisticsService.getTotalExpense();
    this.expenses = this.statisticsService.getExpenses();
    this.createGraph.createLineGraph(this.expenses, this.expensesGraph, this.otherData);
  }

}
