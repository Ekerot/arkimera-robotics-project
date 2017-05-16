import { Injectable } from '@angular/core';

import { GraphRequest } from 'app/_models/graphRequest';

@Injectable()
export class StatisticsService {
  public profit: number;
  public totalExpenses = 0;
  public totalIncome = 0;
  private recents =  [{
    success: true,
    data: [{
      verificationSerie: 'A',
      description: 'Maxi ICA Stormarknad',
      receiptDate: '2017-06-03',
      accounts: [
        {
          account: 1930,
          debit: 20.00,
          credit: 242.18
        },
      ]
    },
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-05-04',
        accounts: [
          {
            account: 1930,
            debit: 100.00,
            credit: 205.18
          },
        ]
      }
      ,
      {
        verificationSerie: 'A',
        description: 'Maxi ICA Stormarknad',
        receiptDate: '2017-06-10',
        accounts: [
          {
            account: 1930,
            debit: 60.00,
            credit: 42.18
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
            credit: 102.18
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
            debit: 50.00,
            credit: 302.18
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
            debit: 70.00,
            credit: 302.18
          },
        ]
      }],
    time: '2017-03-28 11:41:02'
  }];

  /*Returns the total amount of profit*/
  public getTotalProfit () {
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
  }

  /*Returns the total amount of expenses*/
  public getTotalExpense () {
    return this.totalExpenses;
  }

  /*Returns the total amount of income*/
  public getTotalIncome () {
    return this.totalIncome;
  }

  /*Returns the last 7 days of incomes in an array of objects with amount and data*/
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
    incomes = this.dateSummation(incomes);
    incomes = this.sortAndReduce(incomes);
    return incomes;
  }

  /*Returns the last 7 days of expenses in an array of objects with amount and data*/
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
    expenses = this.dateSummation(expenses);
    expenses = this.sortAndReduce(expenses);
    return expenses;
  }

  /*Sorts array according to the date. Reverses it so the newest date is first in the array.
  * If the array is larger then 7, reduce the amount by deleting everything after 7*/
  private sortAndReduce(array: any) {
    array.sort(function(a, b) {return (a.date < b.date) ? 1 : ((b.date > a.date) ? -1 : 0); } );
    array.reverse();
    if (array.length > 7) {
      array.splice(7, (array.length - 7));
    }
    return array;
  }

  /*Summation of the credit or debit depending on the date. If the date is the same,
  * add the credit/debit together and return the new array*/
  private dateSummation(array: any) {
    for (let i = 0; i < array.length; i++) {
      let date = array[i].date;
      for (let j = 0; j < array.length; j++) {
        if (j === i) {
          break;
        }
        if (date === array[j].date) {
          array[i].data += array[j].data;
          array.splice(j, 1)
        }
      }
    }
    return array;
  }
}
