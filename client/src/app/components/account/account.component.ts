import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public myForm: FormGroup;
  public invoiceItemsData = [{



  }];
  public selectedValue: string;

  public accounts = [
    { value: '1910', viewValue: 'Kassa' },
    { value: '1920', viewValue: 'Plusgiro' },
    { value: '1930', viewValue: 'Bankkonto' },
    { value: '2611', viewValue: 'Utående moms försäljning i Sverige 25%' },
    { value: '2621', viewValue: 'Utående moms försäljning i Sverige 12%' },
    { value: '2641', viewValue: 'Ingående moms' },
    { value: '3052', viewValue: 'Försäljn momspliktiga varor Sverige 25%' },
    { value: '3051', viewValue: 'Försäljn momspliktiga varor Sverige 12%' },
    { value: '3740', viewValue: 'Öresutjämning' },
    { value: '5611', viewValue: 'Drivmedel personbilar' },
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

  deleteRow(id) {
    console.log('Delete: ' + id)
  }

}
