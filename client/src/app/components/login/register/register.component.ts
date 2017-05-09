import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../../_services/auth.service';
import { HttpService } from '../../../_services/http.service';
import { User } from '../../../_models/user';

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
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]]
    });
  }

  onSubmitLogin(form: FormGroup): void {
    this.loading = true;

    // Disable formControls during pending login
    this.registerForm.disable();

    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const passwordRepeat = this.registerForm.get('passwordRepeat').value;

    if (password !== passwordRepeat) {
      this.openSnackBar('Passwords does not match!');
      this.registerForm.patchValue({ passwordRepeat: '' });
      this.loading = false;
      this.registerForm.enable();
      return;
    }

    const user: User = new User(
      username,
      password
    );

    this.http.registerNewUser(user)
      .subscribe(res => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, error => {
        this.loading = false;
        this.registerForm.enable();
        this.registerForm.patchValue({ password: '' });

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
