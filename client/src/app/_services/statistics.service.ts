import { Injectable } from '@angular/core';

import { FileResponse } from 'app/_models';
import { GraphRequest } from 'app/_models/graphRequest';

@Injectable()
export class StatisticsService {
  public profit: number;
  public totalExpenses = 0;
  public totalIncome = 0;
  public expenses = [];
  recents =  [{
    success: true,
    data: [{
      verificationSerie: 'A',
      description: 'Maxi ICA Stormarknad',
      receiptDate: '2016-06-03',
      accounts: [
        {
          account: 1930,
          debit: 0.00,
          credit: 242.18
        },
        {
          account: 7600,
          debit: 241.24,
          credit: 0.00
        },
        {
          account: 2641,
          debit: 28.94,
          credit: 0.00
        },
        {
          account: 6100,
          debit: 1.60,
          credit: 0.00
        },
        {
          account: 2641,
          debit: 0.40,
          credit: 0.00
        }
      ]
    }],
    time: '2017-03-28 11:41:02'
  }];

  getTotalProfit () {
    //this.httpService.getAllFiles()
    // .subscribe(res => {

    for (const i of Object.keys(this.recents)) {
      for (const j of Object.keys(this.recents[i].data)) {
        for (const k of Object.keys(this.recents[i].data[j].accounts)) {
          this.totalExpenses += this.recents[i].data[j].accounts[k].debit;
          this.totalIncome += this.recents[i].data[j].accounts[k].credit;
        }
      }
    }
    this.profit = this.totalExpenses - this.totalIncome;
    return this.profit
    //}, error => {
    //});
  }

  getTotalExpense () {
    return this.totalExpenses;
  }
  getTotalIncome () {
    return this.totalIncome;
  }

  getIncomes () {
    let incomes = [];
    for (const i of Object.keys(this.recents)) {
      for (const j of Object.keys(this.recents[i].data)) {
        incomes[] = new GraphRequest(originalName, status, null);
      }
    }
  }
}
