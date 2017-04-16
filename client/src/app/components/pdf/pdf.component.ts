import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  value = '0.8'; // Starting zoom value
  page = 1; // Starting page

  pdfOptions = {
    data: ''
  };

  // TODO: How to handle more than one page? Vertical slider? How do we get numPages?

  constructor() { }

  ngOnInit() {
  }

  onFileChanged($event: Event): void {
    const file = (<HTMLInputElement>$event.target).files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      this.pdfOptions.data = fileReader.result;
    };

    fileReader.readAsBinaryString(file);
  }
}
