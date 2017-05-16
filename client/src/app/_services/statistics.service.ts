import { Injectable } from '@angular/core';

import { GraphRequest } from 'app/_models/graphRequest';

@Injectable()
export class StatisticsService {
  public profit: number;
  public totalExpenses = 0;
  public totalIncome = 0;
  private extracted =  [{
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
        }, {
          account: 1930,
          debit: 20.00,
          credit: 242.18
        }, {
          account: 1930,
          debit: 20.00,
          credit: 242.18
        }
      ]
    }],
    time: '2017-03-28 11:41:02'
  }];
  private booked =  [{
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
        }, {
          account: 1930,
          debit: 20.00,
          credit: 242.18
        }
      ]
    }],
    time: '2017-03-28 11:41:02'
  }];

  /*Returns the total amount of profit*/
  public getTotalProfit () {
    for (const i of Object.keys(this.extracted)) {
      for (const j of Object.keys(this.extracted[i].data)) {
        for (const k of Object.keys(this.extracted[i].data[j].accounts)) {
          this.totalExpenses += this.extracted[i].data[j].accounts[k].debit;
          this.totalIncome += this.extracted[i].data[j].accounts[k].credit;
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
    for (const i of Object.keys(this.extracted)) {
      for (const j of Object.keys(this.extracted[i].data)) {
        for (const k of Object.keys(this.extracted[i].data[j].accounts)) {
          total += this.extracted[i].data[j].accounts[k].credit;
        }
        incomes[counter] = new GraphRequest(total, this.extracted[i].data[j].receiptDate);
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
    for (const i of Object.keys(this.extracted)) {
      for (const j of Object.keys(this.extracted[i].data)) {
        for (const k of Object.keys(this.extracted[i].data[j].accounts)) {
          total += this.extracted[i].data[j].accounts[k].debit;
        }
        expenses[counter] = new GraphRequest(total, this.extracted[i].data[j].receiptDate);
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

  public statsticsCalculation () {
    let max = 2;
    let points = 0;
    max += this.maxCalculation();
    points = this.pointCalculation();
    return points / max
  }

  public maxCalculation() {
    let extractAccount = 0;
    let bookedAccount = 0;
    for (const i of Object.keys(this.extracted)) {
      for (const j of Object.keys(this.extracted[i].data)) {
        extractAccount += this.extracted[i].data[j].accounts.length;
      }
    }
    for (const i of Object.keys(this.booked)) {
      for (const j of Object.keys(this.booked[i].data)) {
          bookedAccount += this.booked[i].data[j].accounts.length;
      }
    }
    if ( extractAccount > bookedAccount) {
      return extractAccount;
    }
    else {
      return bookedAccount;
    }

  }

  public pointCalculation() {
    let points = 0;
    let date = [];
    let description = [];
    let credit = [];
    let debit = [];
    let account = [];
    let counter = 0;
    for (const i of Object.keys(this.extracted)) {
      for (const j of Object.keys(this.extracted[i].data)) {
        description[counter] = this.extracted[i].data[j].description;
        date[counter] = this.extracted[i].data[j].receiptDate;
        for (const k of Object.keys(this.extracted[i].data[j].accounts)) {
          credit[counter] = this.extracted[i].data[j].accounts[k].credit;
          debit[counter] = this.extracted[i].data[j].accounts[k].debit;
          account[counter] = this.extracted[i].data[j].accounts[k].account;
        }
      }
    }
    counter = 0;
    for (const i of Object.keys(this.booked)) {
      for (const j of Object.keys(this.booked[i].data)) {
        if (date[counter] === this.booked[i].data[j].receiptDate) {
          points++;
        }
        if (description[counter] === this.booked[i].data[j].description) {
          points++;
        }
        for (const k of Object.keys(this.booked[i].data[j].accounts)) {
          if (account[counter] === this.booked[i].data[j].accounts[k].account &&
            (credit[counter] === this.booked[i].data[j].accounts[k].credit
            || debit[counter] === this.booked[i].data[j].accounts[k].debit)) {
            points++;
          }
        }
        counter++;
      }
    }
    console.log(points)
    return points;
  }
}
