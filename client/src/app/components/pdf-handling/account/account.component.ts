import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { Account, ReceiptData, ReceiptResponse } from 'app/_models';
import { BookkeepService, HttpService } from 'app/_services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy {

  // public receiptData: ReceiptResponse = {
  //   success: true,
  //   data: {
  //     verificationSerie: 'A',
  //     description: 'Hej hej',
  //     receiptDate: new Date(2017, 4, 2),
  //     accounts:
  //     [
  //       {
  //         account: 1930,
  //         debit: 0.00,
  //         credit: 128.00
  //       },
  //       {
  //         account: 4323,
  //         debit: 100.00,
  //         credit: 0.00
  //       },
  //       {
  //         account: 1827,
  //         debit: 23.00,
  //         credit: 0.00
  //       },
  //     ]
  //   },
  //   time: new Date(2017, 4, 27, 12, 32)
  // };

  public receiptData: ReceiptResponse;
  public receiptForm: FormGroup;
  public totalAmount: number;

  private fileIdSubscription: Subscription;
  private fileIdToBookkeep: number;

  constructor(
    private bkService: BookkeepService,
    private formBuilder: FormBuilder,
    private http: HttpService
  ) {
    this.totalAmount = 0;

    this.fileIdSubscription = bkService.bookkeepAnnounced$
      .subscribe(fileId => {
        console.debug('GetExtract: ', fileId);
        this.getExtractedData(fileId);
      });
  }

  ngOnInit() {
    if (this.receiptData) {
      this.initForm(this.receiptData.data);

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
      account: [accountNum, Validators.required],
      debit: [debit],
      credit: [credit]
    });
  }

  addAccount(account?: Account): void {
    const control = <FormArray>this.receiptForm.controls['accounts'];
    const accountCtrl = this.initAccount(account);
    control.push(accountCtrl);
  }

  deleteAccount(value: number): void {
    const control = <FormArray>this.receiptForm.controls['accounts'];
    control.removeAt(value);
  }

  getExtractedData(fileId: number): void {
    this.http.getExtractedData(fileId)
      .subscribe(data => this.receiptData = data);
  }

  ngOnDestroy(): void {
    this.fileIdSubscription.unsubscribe();
  }

}
