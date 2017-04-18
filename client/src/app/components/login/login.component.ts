import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: any = {};
  public loading: boolean = false;
  public loginForm: FormGroup;

  constructor(private dialog: MdDialogRef<LoginComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmitLogin(form: FormGroup): void {
    this.loading = true;

    // Disable formControls during pending login
    this.loginForm.disable();

    // Close the dialog with form data
    this.dialog.close(form.value);
  }

  onCancelLogin(): void {
    this.dialog.close(false);
  }

}
