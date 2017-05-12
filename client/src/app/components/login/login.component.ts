import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'app/_services/auth.service';

import { User } from 'app/_models/user';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading: boolean;
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public snackBar: MdSnackBar
  ) {
    this.loading = false;

    if (this.auth.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

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

    const user: User = new User(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
    );

    this.auth.login(user)
      .subscribe(res => {
        this.loading = false;
        this.router.navigate(['/']);
      }, error => {
        this.loading = false;
        this.loginForm.enable();
        this.loginForm.patchValue({ password: '' });

        // TODO: Different messages depending on error type
        this.openSnackBar('Wrong username or password!');
      });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
