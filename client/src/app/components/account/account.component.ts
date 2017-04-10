import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

   public myForm: FormGroup;
       public invoiceItemsData = [{}] ;

       constructor(private formBuilder: FormBuilder) {}

       ngOnInit() {}

        addNewRow(){
          this.invoiceItemsData.push({})
        }
}
