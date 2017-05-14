import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, RequestMethod, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiResponse, User, FileResponse } from 'app/_models';

@Injectable()
export class HttpService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  public uploadFile(file: File): Observable<ApiResponse> {
    const headers = new Headers({
      'enctype': 'multipart/form-data',
      'x-access-token': localStorage.getItem('token') || ''
    });
    const options = new RequestOptions({ headers: headers });

    const formData: FormData = new FormData();
    formData.append('File', file, file.name);

    return this.http.post(this.apiUrl + '/companies/1/files', formData, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public authenticate(user: User): Observable<ApiResponse> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + '/users/auth', user, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public registerNewUser(user: User): Observable<ApiResponse> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + '/users', user, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getFilesReadyForExtraction(): Observable<FileResponse[]> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || ''
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiUrl + '/companies/1/files?status=uploaded', options)
      .map(response => response.json().data as FileResponse[])
      .catch(this.handleError);
  }

  private extractData(res: Response): ApiResponse {
    const body = res.json();
    return body as ApiResponse;
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
    return Observable.throw(errMsg);
  }
}
