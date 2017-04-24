import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { HttpService } from 'app/_services/http.service';

import { ApiResponse, User } from 'app/_models';

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

  login(user: User): Observable<ApiResponse> {
    return this.http.authenticate(user)
      .map(res => {
        localStorage.setItem('token', res.data.token);
        this.isLoggedIn = true;
        return res;
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
