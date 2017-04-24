import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public selectedValue: string;
  public myForm: FormGroup;
  public invoiceItemsData: object[] = [{}];
  public totalAmount: any = 0;
  public oldValue: number = 0;
  public newValue: number;
  public accounts = [
    { value: '', viewValue: '' },
    { value: '1910', viewValue: 'Kassa' },
    { value: '1920', viewValue: 'Plusgiro' },
    { value: '1930', viewValue: 'Bankkonto' },
    { value: '2641', viewValue: 'Ingående moms' },
    { value: '3740', viewValue: 'Öresutjämning' },
    { value: '5611', viewValue: 'Drivmedel personbilar'},
    { value: '5890', viewValue: 'Övriga resekostnader' },
    { value: '6071', viewValue: 'Representation, avdragsgill' },
    { value: '6072', viewValue: 'Representation, ej avdragsgill' },
    { value: '6110', viewValue: 'Kontorsmaterial' },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  addNewRow() {
    this.invoiceItemsData.push({});
  }

  deleteRow() {
    console.log('Delete: ' + this.invoiceItemsData);
    this.invoiceItemsData.find;
  }

  callSelectedValue(value){
    console.log(value);
  }

  update() {

    const val: number[] = [3740, 1910, 1920, 1930]
    this.totalAmount = 0;

    for (let object of this.invoiceItemsData) {

      console.debug(object);

      if (object["amount"] != null) {

        if (val.indexOf(parseInt(object["selectedValue"])) > -1) {

          this.totalAmount -= object["amount"];

        }
        else {

          this.totalAmount += object["amount"];

        }
      }
    }
  }
}

