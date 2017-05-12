import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


import { MdSnackBar } from '@angular/material';
import { ExtractResponse } from 'app/_models';

import 'rxjs/add/operator/debounceTime';

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
          credit: 128.00
        },
        {
          account: 4323,
          debit: 100.00,
          credit: 0.00
        },
        {
          account: 1827,
          debit: 23.00,
          credit: 0.00
        },
      ]
    },
    time: new Date(2017, 4, 27, 12, 32)
  }];

  public accountForm: FormGroup;
  public totalAmount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MdSnackBar) { }

  ngOnInit() {

    this.buildForm();

    for (const account of this.testData[0].data.accounts) {

      const control = <FormArray>this.accountForm.controls['accounts'];
      control.push(this.initAccount(account.account, account.debit, account.credit));
    }

    this.accountForm.valueChanges
      .debounceTime(1000)
      .subscribe(data => {

        this.totalAmount = 0;

        for (const value of data.accounts) {

          this.totalAmount += parseInt(value.debit);
          this.totalAmount -= parseInt(value.credit);

        }
      });
  }

  buildForm(): void {
    this.accountForm = this.formBuilder.group({

      verificationSerie: [this.testData[0].data.verificationSerie, Validators.required],
      description: [this.testData[0].data.description],
      receiptDate: [this.testData[0].data.receiptDate, Validators.required],
      accounts: this.formBuilder.array([
      ])
    });

    this.accountForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  };

  initAccount(account: number, debit: number, credit: number) {

    this.totalAmount += debit;
    this.totalAmount -= credit;

    return this.formBuilder.group({
      account: [account, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)]
      ],
      debit: [debit],
      credit: [credit]
    });
  };

  addAccount() {
    const control = <FormArray>this.accountForm.controls['accounts'];
    control.push(this.initAccount(null, 0, 0));
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

  onValueChanged(data?: any) {
    if (!this.accountForm) {

      return;

    }

    const form = this.accountForm;

    for (const field in this.formErrors) {

      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {

        const messages = this.validationMessages[field];

        for (const key in control.errors) {

          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'account': '',
  };

  validationMessages = {
    'account': {
      'required': 'Account is required.',
      'minlength': 'Account must be at least 4 numbers long.',
      'maxlength': 'Account cannot be more than 4 numbers long.',
    },
  };
}
