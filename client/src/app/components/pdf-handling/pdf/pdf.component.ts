import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../_services/http.service';

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
  public loading: boolean;

  // TODO: How to handle more than one page? Vertical slider? How do we get numPages?

  constructor(private httpService: HttpService) {
    this.loading = false;
  }

  ngOnInit() {
  }

  onFileChanged($event: Event): void {
    this.file = (<HTMLInputElement>$event.target).files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      this.pdfOptions.data = fileReader.result;
    };

    fileReader.readAsBinaryString(this.file);
  }

  onUpload(): void {
    this.loading = true;

    this.httpService.uploadFile(this.file)
      .subscribe(data => {
        console.log('response', data);
        this.loading = false;
      });
  }

  onCancel(): void {
    this.pdfOptions.data = null;
  }
}
