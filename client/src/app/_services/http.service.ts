import { Injectable } from '@angular/core';

import { RequestOptions, Headers, Http, RequestMethod, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { User } from 'app/_models/User';

import { ApiResponse } from 'app/_models/ApiResponse';

@Injectable()
export class HttpService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: Http) { }

  public uploadFile(file: File): Observable<ApiResponse> {
    const headers = new Headers({
      'enctype': 'multipart/form-data',
      'x-access-token': ''
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + '/companies/1/files', file, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public authenticate(user: User): Observable<ApiResponse> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + 'users/auth', user, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
