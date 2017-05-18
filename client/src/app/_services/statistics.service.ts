import { Injectable } from '@angular/core';

import { GraphRequest } from 'app/_models/graphRequest';
import { FileResponse } from 'app/_models';
import { HttpService } from 'app/_services';


@Injectable()
export class StatisticsService {

  private profit = 0;
  private totalExpenses = 0;
  private totalIncome = 0;
  private fileBool = true;
  private files: FileResponse[];
  /*private files =  [{
   _id: 'hej',
   username: 'admin',
   path: 'string',
   originalname: 'string',
   filename: 'string',
   status: 'string',
   FileID: 'number',
   companyID: 'number',
   __v: 'number',
   extractedData: {
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
   }],
   time: '2017-03-28 11:41:02'
   },
   bookedData: {
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
   }],
   time: '2017-03-28 11:41:02'
   },
   }];
   */
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
              this.totalExpenses += Number(res[i].bookedData.accounts[j].debit);
              this.totalIncome += Number(res[i].bookedData.accounts[j].credit);
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
            totalCredit += Number(res[i].bookedData.accounts[j].credit);
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
            totalDebit += Number(res[i].bookedData.accounts[j].debit);
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
}
