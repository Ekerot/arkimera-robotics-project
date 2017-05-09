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

  // TODO: How to handle more than one page? Vertical slider? How do we get numPages?

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    const pdfData = localStorage.getItem('pdf');

    if (pdfData) {
      this.pdfOptions.data = pdfData;
    }
  }

  onFileChanged($event: Event): void {
    this.file = (<HTMLInputElement>$event.target).files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      this.pdfOptions.data = fileReader.result;
      localStorage.setItem('pdf', fileReader.result);
    };

    fileReader.readAsBinaryString(this.file);
  }

  onUpload(): void {
    this.httpService.uploadFile(this.file).subscribe(data => console.log('response', data));
  }

  onCancel(): void {
    this.pdfOptions.data = null;
    localStorage.removeItem('pdf');
  }
}
