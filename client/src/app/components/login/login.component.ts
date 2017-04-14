import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: any = {};
  public loading: boolean = false;

  constructor(private dialog: MdDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmitLogin(): void {
    this.loading = true;

    setTimeout(() => {
      this.dialog.close();
    }, 2000);
  }

  onCancelLogin(): void {
    this.dialog.close('CANCEL');
  }

}
