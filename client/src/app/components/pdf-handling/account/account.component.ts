import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


import { MdSnackBar } from '@angular/material';
import { ExtractResponse } from 'app/_models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {

  public testData: ExtractResponse[] = [{
    success: true,
    data: {
      verificationSerie: 'A',
      description: 'Hej hej',
      receiptDate: new Date(2017, 4, 2),
      accounts:
      [
        {
          account: 1930,
          debit: 0.00,
          credit: 123.00
        },
        {
          account: 4323,
          debit: 1234.00,
          credit: 0.00
        },
        {
          account: 4323,
          debit: 1234.00,
          credit: 0.00
        },
      ]
    },
    time: new Date(2017, 4, 27, 12, 32)
  }];

  public accountForm: FormGroup;
  public totalAmount: number = 0;
  public memo: string;

  /*public accounts = [
    { value: '', viewValue: '' },
    { value: 1910, viewValue: 'Kassa' },
    { value: 1920, viewValue: 'Plusgiro' },
    { value: 1930, viewValue: 'Bankkonto' },
    { value: 2641, viewValue: 'Ingående moms' },
    { value: 3740, viewValue: 'Öresutjämning' },
    { value: 5611, viewValue: 'Drivmedel personbilar' },
    { value: 5890, viewValue: 'Övriga resekostnader' },
    { value: 6071, viewValue: 'Representation, avdragsgill' },
    { value: 6072, viewValue: 'Representation, ej avdragsgill' },
    { value: 6110, viewValue: 'Kontorsmaterial' },
  ];*/

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MdSnackBar) { }

  ngOnInit() {

    this.accountForm = this.formBuilder.group({

      verificationSerie: [this.testData[0].data.verificationSerie, Validators.required],
      description: [this.testData[0].data.description],
      receiptDate: [this.testData[0].data.receiptDate, Validators.required],
      accounts: this.formBuilder.array([
      ])
    })

    for (const account of this.testData[0].data.accounts) {
      const control = <FormArray>this.accountForm.controls['accounts'];
    control.push(this.initAccount( account.account, account.debit, account.credit ));
    }

  }

  initAccount( account: number,debit: number, credit: number ) {

    return this.formBuilder.group({
      account: [account, Validators.required],
      debit: [debit],
      credit: [credit]
    });
  }

  addAccount() {

    const control = <FormArray>this.accountForm.controls['accounts'];
    control.push(this.initAccount( null, null, null ));
  }

  deleteAccount(value: number) {

    const control = <FormArray>this.accountForm.controls['accounts'];
    control.removeAt(value);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}



