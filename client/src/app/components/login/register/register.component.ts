import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../../_services/auth.service';
import { HttpService } from '../../../_services/http.service';
import { User } from '../../../_models/user';

import * as helpers from 'app/_helpers/helpers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public loading: boolean;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private http: HttpService,
    private router: Router,
    public snackBar: MdSnackBar
  ) {
    this.loading = false;

    if (this.auth.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(5)]],
      subscriptionKey: ['', [Validators.required, Validators.minLength(32), Validators.maxLength(32)]],
      clientKey: ['', [Validators.required, Validators.minLength(22), Validators.maxLength(22)]],
      appUrl: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmitRegister(form: FormGroup): void {
    this.loading = true;

    // Disable formControls during pending login
    this.registerForm.disable();

    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const passwordRepeat = this.registerForm.get('passwordRepeat').value;
    const subscriptionKey = this.registerForm.get('subscriptionKey').value;
    const clientKey = this.registerForm.get('clientKey').value;
    const appUrl = helpers.buildAzoraOneUrl(this.registerForm.get('appUrl').value);

    if (password !== passwordRepeat) {
      this.openSnackBar('Passwords does not match!');
      this.registerForm.patchValue({ passwordRepeat: '' });
      this.loading = false;
      this.registerForm.enable();
      return;
    }

    const user: User = {
      username,
      password,
      subscriptionKey,
      clientKey,
      appUrl
    };

    this.http.registerNewUser(user)
      .subscribe(res => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, error => {
        this.loading = false;
        this.registerForm.enable();
        this.registerForm.patchValue({ password: '' });

        // TODO: Different messages depending on error type
        this.openSnackBar('Unable to register user!');
      });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
