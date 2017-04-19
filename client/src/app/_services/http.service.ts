import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ExtractResponse } from 'app/_models/ExtractResponse';

@Injectable()
export class HttpService {

  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:8080';
  }

  uploadFile(file: File): Promise<ExtractResponse> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': 'jhasdkjhasdkjhd'
    });

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const returnReponse = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/companies/1/files', formData, { headers })
      .toPromise()
      .then(res => res.json() as ExtractResponse)
      .catch(this.handleError);
    });

    return returnReponse;
  }

  private handleError(error: Response | any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
