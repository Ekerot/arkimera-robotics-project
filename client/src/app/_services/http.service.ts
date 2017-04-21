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
      'enctype': 'multipart/form-data',
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNDkyNjA5NTAzLCJleHAiOjE0OTI2OTU5MDN9.7Ddw7W7ojGdpuX604o_5GVppdJmNEP58HZsN791QsBE'
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
