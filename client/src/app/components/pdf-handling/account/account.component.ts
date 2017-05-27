import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { Account, ReceiptData, FileResponse } from 'app/_models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedFile: FileResponse;
  @Output() performBookkeep = new EventEmitter()

  public receiptData: ReceiptData;
  public receiptForm: FormGroup;
  public totalAmount: number;
  public loading: boolean;

  private formChangeSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.totalAmount = 0;
    this.loading = false;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.debug('FILE: ', this.selectedFile);
    if (this.selectedFile && changes['selectedFile']) {
      this.receiptData = this.selectedFile.extractedData;
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    if (this.formChangeSubscription) {
      this.formChangeSubscription.unsubscribe();
    }
  }

  initForm(): void {
    const accounts: FormArray = new FormArray([]);
    const data = this.receiptData;

    this.totalAmount = 0;

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

  onSubmitReceipt(receiptForm: FormGroup): void {
    // this.loading = true;
    const receiptData = receiptForm.value as ReceiptData;
    this.performBookkeep.emit(receiptData);

    // this.http.postReceiptData(receiptData, this.selectedFile.FileID)
    //   .subscribe(data => {
    //     this.bkService.confirmBookkeep(this.selectedFile.FileID);
    //     this.loading = false;
    //     this.openSnackBar('Receipt successfully bookkeeped');
    //   });
  }

}
