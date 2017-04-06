import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  value = '0.5'; // Starting zoom value
  pdfSrc = 'assets/pdf/kvitto.pdf'; // NB! Case sensitive filenames!
  page = 1; // Starting page

  // TODO: How to handle more than one page? Vertical slider? How do we get numPages?

  constructor() { }

  ngOnInit() {
  }
  
}
