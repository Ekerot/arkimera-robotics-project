import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { Account, ReceiptData } from 'app/_models';
import { BookkeepService, HttpService } from 'app/_services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})

export class AccountComponent implements OnInit, OnDestroy {


  public receiptData: ReceiptData;
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
        this.fileIdToBookkeep = fileId;
        this.getExtractedData(fileId);
      });
  }

  ngOnInit() {
    if (this.receiptData) {
      this.initForm();

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

  initForm(): void {
    const accounts: FormArray = new FormArray([]);
    const data = this.receiptData;

    this.receiptForm = this.formBuilder.group({
      verificationSerie: [data.verificationSerie, Validators.required],
      description: [data.description],
      receiptDate: [data.receiptDate, Validators.required],
      accounts: accounts
    });

    data.accounts.forEach((account: Account) => {
      this.totalAmount += Number(account.debit);
      this.totalAmount -= Number(account.credit);

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

    /**
   * Adds new bookkeeping row
   *
   * @param {account} Account
   *
   * @memberof AccountComponent
   */

  addAccount(account?: Account): void {
    const control = <FormArray>this.receiptForm.controls['accounts'];
    const accountCtrl = this.initAccount(account);
    control.push(accountCtrl);
  }

  /**
   * Delete account depending on value input
   * Value = index
   *
   * @param {value} number
   *
   * @memberof AccountComponent
   */

  deleteAccount(value: number): void {
    const control = <FormArray>this.receiptForm.controls['accounts'];
    control.removeAt(value);
  }

  /**
   * Get extracted data from receipt
   *
   * @param {fileID} number
   *
   * @memberof AccountComponent
   */

  getExtractedData(fileId: number): void {
    this.http.getExtractedData(fileId)
      .subscribe(data => {
        this.receiptData = data;
        this.initForm();
      });
  }

  onSubmitReceipt(receiptForm: FormGroup): void {
    const receiptData = receiptForm.value as ReceiptData;

    this.http.postReceiptData(receiptData, this.fileIdToBookkeep)
      .subscribe(data => {
        this.bkService.confirmBookkeep(this.fileIdToBookkeep);
        this.resetCurrentStatus();
      });
  }

    /**
   * Reset all values 
   *
   * @param 
   *
   * @memberof AccountComponent
   */

  private resetCurrentStatus(): void {
    this.receiptData = null;
    this.receiptForm = null;
    this.totalAmount = 0;
    this.fileIdToBookkeep = null;
  }

  ngOnDestroy(): void {
    this.fileIdSubscription.unsubscribe();
  }

}
