import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @Input() pdfSrc: string;

  public pdf: PDFDocumentProxy;

  public zoom = '0.5'; // Starting zoom value
  public page = 1; // Starting page

  constructor() { }

  ngOnInit() { }

  /**
 * Get pdf information after it's loaded
 *
 * You can get numPages from this.pdf.numPages
 *
 * @param {PDFDocumentProxy} pdf
 *
 * @memberof PdfComponent
 */
  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf;
  }

}
