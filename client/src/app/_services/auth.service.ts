import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

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

  getLoggedInUsername(): string {
    const decodedToken = this.decodeToken();

    if (decodedToken) {
      return decodedToken.username;
    }

    return '';
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

  private decodeToken(): User {
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelper();

    if (token && tokenNotExpired()) {
      return jwtHelper.decodeToken(token) as User;
    } else {
      return null;
    }
  }
}
