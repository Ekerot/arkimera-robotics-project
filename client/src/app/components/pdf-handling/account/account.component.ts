import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { Account, ReceiptData, ReceiptResponse } from 'app/_models';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {

  public testData: ReceiptResponse = null;

  public receiptForm: FormGroup;
  public totalAmount: number;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.totalAmount = 0;
  }

  ngOnInit() {
    if (this.testData) {
      this.initForm(this.testData.data);

      this.receiptForm.valueChanges
        .debounceTime(200)
        .subscribe((formData: ReceiptData) => {
          this.totalAmount = 0;

          formData.accounts.forEach((account: Account) => {
            this.totalAmount += Number(account.debit);
            this.totalAmount -= Number(account.credit);
          })
        });
    }
  }

  initForm(data: ReceiptData): void {
    const accounts: FormArray = new FormArray([]);

    this.receiptForm = this.formBuilder.group({
      verificationSerie: [data.verificationSerie, Validators.required],
      description: [data.description],
      receiptDate: [data.receiptDate, Validators.required],
      accounts: accounts
    });

    data.accounts.forEach((account: Account) => {
      this.totalAmount += account.debit;
      this.totalAmount -= account.credit;

      this.addAccount(account);
    });
  }

  initAccount(account?: Account): FormGroup {
    const accountNum = account ? account.account : '';
    const debit = account ? account.debit : 0;
    const credit = account ? account.credit : 0;

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

  addAccount(account?: Account): void {
    const control = <FormArray>this.receiptForm.controls['accounts'];
    const accountCtrl = this.initAccount(account);
    control.push(accountCtrl);
  }

  deleteAccount(value: number): void {
    const control = <FormArray>this.receiptForm.controls['accounts'];
    control.removeAt(value);
  }
}
