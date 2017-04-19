import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public myForm: FormGroup;
  public invoiceItemsData = [{}];
  public selectedValue: string;

  public accounts = [
    { value: 'account1', viewValue: '1' },
    { value: 'account2', viewValue: '2' },
    { value: 'account3', viewValue: '3' }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  addNewRow() {
    this.invoiceItemsData.push({});
  }
}
