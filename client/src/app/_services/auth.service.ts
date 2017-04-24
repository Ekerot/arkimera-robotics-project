import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from 'app/_services/http.service';

import { User } from 'app/_models/user';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean;

  constructor(
    private http: HttpService,
    private router: Router
  ) {
    this.isLoggedIn = false;

    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  }

  // TODO: Should probably make this observable and move router logic to component that asks for login
  login(user: User): void {
    this.http.authenticate(user)
      .subscribe(
      result => {
        localStorage.setItem('token', (<any>result.data).token);
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('LOGIN ERROR: ', error);
      }
      );
  }

  // TODO: Should probably make this observable and move router logic to component that asks for logout
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
