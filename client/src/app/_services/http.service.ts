import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiResponse } from 'app/_models/ApiResponse';

@Injectable()
export class HttpService {

  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: Http) {}

  public uploadFile(file: File): Observable<ApiResponse> {
    const headers = new Headers({
      'enctype': 'multipart/form-data',
      'x-access-token': ''
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + '/companies/1/files', file, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
