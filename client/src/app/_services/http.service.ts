import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, RequestMethod, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiResponse, User, FileResponse, ReceiptData } from 'app/_models';


@Injectable()
export class HttpService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  /**
   * Upload a single File
   *
   * @param {File} file
   * @returns {Observable<ApiResponse>}
   *
   * @memberof HttpService
   */
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

  /**
   * Upload an array of Files
   *
   * @param {File[]} files
   * @returns {Observable<ApiResponse[]>}
   *
   * @memberof HttpService
   */
  public uploadFiles(files: File[]): Observable<ApiResponse[]> {
    const fileObservables = files.map((file: File, fileIndex: number) => {
      return this.uploadFile(file)
        .map(apiRes => apiRes as ApiResponse)
        .catch((error: any) => {
          console.error('Failed to upload file: ', file.name);
          // If error occurs when uploading a file response will be [..., ApiResponse, null, ApiResponse, ...]
          return Observable.of(null);
        });
    });

    return Observable.forkJoin(fileObservables);
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

    return this.http.get(this.apiUrl + '/companies/1/files?status=extracted', options)
      .map(response => response.json().data as FileResponse[])
      .catch(this.handleError);
  }
  public getBookedFiles(): Observable<FileResponse[]> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || ''
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiUrl + '/companies/1/files?status=booked', options)
      .map(response => response.json().data as FileResponse)
      .catch(this.handleError);
  }

  public getExtractedData(fileId: number): Observable<FileResponse> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || ''
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiUrl + `/companies/1/files/${fileId}`, options)
      .map(response => {
        const data = response.json().data as FileResponse;
        return data;
      })
      .catch(this.handleError);
  }

  public postReceiptData(receiptData: ReceiptData, fileId: number): Observable<void> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || ''
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(this.apiUrl + `/companies/1/files/${fileId}/receipts`, receiptData, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAllFiles(): Observable<ApiResponse> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || ''
    });
    const options = new RequestOptions({headers: headers});

    return this.http.get(this.apiUrl + '/companies/1/files', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response): ApiResponse {
    const body = res.json();
    return body as ApiResponse;
  }

  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      console.log(error)
      const body = error.json() || '';
      const err = body.message;
      errMsg = `${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.log(errMsg);

    return Observable.throw(errMsg);
  }
}
