import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
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
  public loading: boolean;

  private fileIdSubscription: Subscription;
  private fileIdToBookkeep: number;
  private formChangeSubscription: Subscription;

  constructor(
    private bkService: BookkeepService,
    private formBuilder: FormBuilder,
    private http: HttpService,
    public snackBar: MdSnackBar
  ) {

    this.totalAmount = 0;
    this.loading = false;

    this.fileIdSubscription = bkService.bookkeepAnnounced$
      .subscribe(fileId => {
        this.fileIdToBookkeep = fileId;
        this.getExtractedData(fileId);
      });
  }

  ngOnInit() {
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
      this.updateTotalAmount(account);
      this.addAccount(account);

    });

    this.formChangeSubscription = this.receiptForm.valueChanges
      .debounceTime(200)
      .subscribe((formData: ReceiptData) => {
        this.totalAmount = 0;

        formData.accounts.forEach((account: Account) => {
          this.updateTotalAmount(account);
        })
      });
  }

  private updateTotalAmount(account: Account): void {
    this.totalAmount = Number(this.totalAmount) + Math.round(Number(account.debit.toString().replace(',', '.')) * 100) / 100;
    this.totalAmount = Number(this.totalAmount) - Math.round(Number(account.credit.toString().replace(',', '.')) * 100) / 100;
    this.totalAmount = Math.round(this.totalAmount * 100) / 100;
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
    this.loading = true;
    const receiptData = receiptForm.value as ReceiptData;

    this.http.postReceiptData(receiptData, this.fileIdToBookkeep)
      .subscribe(data => {
        this.bkService.confirmBookkeep(this.fileIdToBookkeep);
        this.resetCurrentStatus();
        this.loading = false;
        this.openSnackBar('Receipt successfully bookkeeped');
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
    this.formChangeSubscription.unsubscribe();
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

}
