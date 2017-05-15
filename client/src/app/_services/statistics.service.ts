import { Injectable } from '@angular/core';

import { GraphRequest } from 'app/_models/graphRequest';

@Injectable()
export class StatisticsService {
  public profit: number;
  public totalExpenses = 0;
  public totalIncome = 0;
  public expenses = [];
  private recents =  [{
    success: true,
    data: [{
      verificationSerie: 'A',
      description: 'Maxi ICA Stormarknad',
      receiptDate: '2017-06-03',
      accounts: [
        {
          account: 1930,
          debit: 0.00,
          credit: 242.18
        },
      ]
    },
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-06-04',
        accounts: [
          {
            account: 1930,
            debit: 0.00,
            credit: 245.18
          },
        ]
      }
      ,
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-06-05',
        accounts: [
          {
            account: 1930,
            debit: 0.00,
            credit: 142.18
          },
        ]
      }
      ,
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-05-04',
        accounts: [
          {
            account: 1930,
            debit: 0.00,
            credit: 202.18
          },
        ]
      },
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-05-03',
        accounts: [
          {
            account: 1930,
            debit: 0.00,
            credit: 202.18
          },
        ]
      },
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-05-06',
        accounts: [
          {
            account: 1930,
            debit: 0.00,
            credit: 202.18
          },
        ]
      },
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-05-07',
        accounts: [
          {
            account: 1930,
            debit: 0.00,
            credit: 202.18
          },
        ]
      },
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-05-08',
        accounts: [
          {
            account: 1930,
            debit: 0.00,
            credit: 202.18
          },
        ]
      }],
    time: '2017-03-28 11:41:02'
  }];

  public getTotalProfit () {
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
    this.profit = this.totalIncome - this.totalExpenses;
    return this.profit
    //}, error => {
    //});
  }

  public getTotalExpense () {
    return this.totalExpenses;
  }

  public getTotalIncome () {
    return this.totalIncome;
  }

  public getIncomes () {
    let incomes = [];
    let total = 0;
    let counter = 0;
    for (const i of Object.keys(this.recents)) {
      for (const j of Object.keys(this.recents[i].data)) {
        for (const k of Object.keys(this.recents[i].data[j].accounts)) {
          total += this.recents[i].data[j].accounts[k].credit;
        }
        incomes[counter] = new GraphRequest(total, this.recents[i].data[j].receiptDate);
        total = 0;
        counter++;
      }
    }

    for (let i = 0; i < incomes.length; i++) {
      let date = incomes[i].date;
      for (let j = 0; j < incomes.length; j++) {
        if (j === i) {
          break;
        }
        if (date === incomes[j].date) {
          incomes[i].data += incomes[j].data;
          incomes.splice(j, 1)
        }
      }
    }
    incomes = this.sortAndReduce(incomes);
    return incomes;
  }

  public getExpenses () {
    let expenses = [];
    let total = 0;
    let counter = 0;
    for (const i of Object.keys(this.recents)) {
      for (const j of Object.keys(this.recents[i].data)) {
        for (const k of Object.keys(this.recents[i].data[j].accounts)) {
          total += this.recents[i].data[j].accounts[k].debit;
        }
        expenses[counter] = new GraphRequest(total, this.recents[i].data[j].receiptDate);
        total = 0;
        counter++;
      }
    }

    for (let i = 0; i < expenses.length; i++) {
      let date = expenses[i].date;
      for (let j = 0; j < expenses.length; j++) {
        if (j === i) {
          break;
        }
        if (date === expenses[j].date) {
          expenses[i].data += expenses[j].data;
          expenses.splice(j, 1)
        }
      }
    }
    expenses = this.sortAndReduce(expenses);
    return expenses;
  }

  private sortAndReduce(data: any) {
    data.sort(function(a, b) {return (a.date < b.date) ? 1 : ((b.date > a.date) ? -1 : 0); } );
    data.reverse();
    if (data.length > 7) {
      data.splice(7, (data.length - 7));
    }
    return data;
  }
}
