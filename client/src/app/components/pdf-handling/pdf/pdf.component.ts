import { Component, OnInit } from '@angular/core';

import { HttpService } from 'app/_services/http.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  public zoom = '0.7'; // Starting zoom value
  public page = 1; // Starting page
  public pdfOptions = {
    data: null
  };
  public file: File;

  private fileContentsName: string;
  private fileDataName: string;

  // TODO: How to handle more than one page? Vertical slider? How do we get numPages?

  constructor(private httpService: HttpService) {
    this.fileContentsName = 'pdfContents';
    this.fileDataName = 'pdfData';
   }

  ngOnInit() {
    const pdfContents = localStorage.getItem(this.fileContentsName);
    const pdfData = localStorage.getItem(this.fileDataName);

    if (pdfContents && pdfData) {
      this.pdfOptions.data = pdfContents;
      this.file = JSON.parse(pdfData) as File;
    }
  }

  onFileChanged($event: Event): void {
    this.file = (<HTMLInputElement>$event.target).files[0];
    const fileReader = new FileReader();

    console.debug('File: ', this.file);
    console.debug('File: ', JSON.stringify(this.file));

    fileReader.onloadend = (e) => {
      this.pdfOptions.data = fileReader.result;
      localStorage.setItem(this.fileContentsName, fileReader.result);
      localStorage.setItem(this.fileDataName, JSON.stringify(this.file));
    };

    fileReader.readAsBinaryString(this.file);
  }

  onUpload(): void {
    this.httpService.uploadFile(this.file)
    .subscribe(data => console.log('response', data));
  }

  onCancel(): void {
    this.pdfOptions.data = null;
    localStorage.removeItem(this.fileContentsName);
    localStorage.removeItem(this.fileDataName);
  }
}
