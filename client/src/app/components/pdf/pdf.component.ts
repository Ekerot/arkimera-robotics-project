import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  pdfSrc: string = 'assets/pdf/Faktura.pdf';
  page: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
