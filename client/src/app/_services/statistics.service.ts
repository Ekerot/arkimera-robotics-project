import { Injectable } from '@angular/core';

import { GraphRequest } from 'app/_models/graphRequest';
import { FileResponse } from 'app/_models';
import { HttpService } from 'app/_services';


@Injectable()
export class StatisticsService {

  private profit = 0;
  private totalExpenses = 0;
  private totalIncome = 0;
  private files: FileResponse[];
  constructor(private httpService: HttpService) {
  }

  public getFiles () {
    this.httpService.getBookedFiles()
      .subscribe(res => {
        this.files = res;
      }, error => {
        console.log(error);
      })
  }

  /*Returns the total amount of profit*/
  public getTotalProfit (res: any) {
    for (const i of Object.keys(res)) {
      for (const j of Object.keys(res[i].bookedData.accounts)) {
        if (res[i].bookedData.accounts[j].debit !== '') {
          this.totalExpenses += parseFloat(res[i].bookedData.accounts[j].debit);
        }
        if (res[i].bookedData.accounts[j].credit !== '') {
          this.totalIncome += parseFloat(res[i].bookedData.accounts[j].credit);
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
  public getIncomes (res: any) {
    let incomes = [];
    let totalCredit = 0;
    for (const i of Object.keys(res)) {
      for (const j of Object.keys(res[i].bookedData.accounts)) {
        if (res[i].bookedData.accounts[j].credit !== '') {
          totalCredit += parseFloat(res[i].bookedData.accounts[j].credit);
        }
      }
      incomes.push(new GraphRequest(totalCredit, res[i].bookedData.receiptDate));
      totalCredit = 0;
    }
    incomes = this.dateSummation(incomes);
    incomes = this.sortAndReduce(incomes);
    return incomes;
  }

  /*Returns the last 7 days of expenses in an array of objects with amount and data*/
  public getExpenses (res: any) {
    let expenses = [];
    let totalDebit = 0;
    for (const i of Object.keys(res)) {
      for (const j of Object.keys(res[i].bookedData.accounts)) {
        if (res[i].bookedData.accounts[j].debit !== '') {
          totalDebit += parseFloat(res[i].bookedData.accounts[j].debit);
        }
      }
      expenses.push(new GraphRequest(totalDebit, res[i].bookedData.receiptDate));
      totalDebit = 0;
    }
    expenses = this.dateSummation(expenses);
    expenses = this.sortAndReduce(expenses);
    return expenses;
  }

  /*Sorts array according to the date. Reverses it so the newest date is first in the array.
   * If the array is larger then 7, reduce the amount by deleting everything after 7*/
  private sortAndReduce(array: any ) {
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
      const date = array[i].date;
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

public statsticsCalculation (res: any) {
    let max = 0;
    let points = 0;
    max += this.maxCalculation(res);
    points = this.pointCalculation(res);
    return points / max
  }

  public maxCalculation(res: any) {
    let max = 0;
    let extractAccount = 0;
    let bookedAccount = 0;
    for (const i of Object.keys(res)) {
        extractAccount += res[i].bookedData.accounts.length;
        if (res[i].bookedData.description) {
          max++;
        }
      if (res[i].bookedData.date) {
        max++;
      }
      if (res[i].extractedData.date) {
        max++;
      }
      if (res[i].extractedData.description) {
        max++;
      }
    }
    for (const i of Object.keys(res)) {
        bookedAccount += res[i].bookedData.accounts.length;
      }

    if ( extractAccount > bookedAccount) {
      return max + extractAccount;
    } else {
      return max + bookedAccount;
    }

  }

  public pointCalculation(res: FileResponse) {
    let points = 0;
    const credit = [];
    const debit = [];
    const account = [];
    for (const i of Object.keys(res)) {
      if (res[i].extractedData.description === res[i].bookedData.description) {
        points++;
      }
      if (res[i].extractedData.receiptDate === res[i].bookedData.receiptDate) {
        points++;
      }
      for (const j of Object.keys(res[i].bookedData.accounts)) {
        if (res[i].extractedData.accounts[j].account === res[i].bookedData.accounts[j].account &&
          (res[i].extractedData.accounts[j].credit === res[i].extractedData.accounts[j].credit
          || res[i].extractedData.accounts[j].debit === res[i].extractedData.accounts[j].debit)) {
          points++;
        }
      }
    }
    return points;
  }
}
