import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import { HttpService } from 'app/_services/http.service';

import { ApiResponse, User } from 'app/_models';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  isUserLoggedIn(): boolean {
    try {
      if (tokenNotExpired()) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  login(user: User): Observable<ApiResponse> {
    return this.http.authenticate(user)
      .map(res => {
        localStorage.setItem('token', res.data.token);
        return res;
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
