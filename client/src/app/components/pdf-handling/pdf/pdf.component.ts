import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @Input() pdfSrc: string;
  @Input() pdf: PDFDocumentProxy;

  public zoom = '0.70'; // Starting zoom value
  public page = 1; // Starting page

  constructor() { }

  ngOnInit() { }

}
