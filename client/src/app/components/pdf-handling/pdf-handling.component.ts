import { Component, OnInit } from '@angular/core';

import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-pdf-handling',
  templateUrl: './pdf-handling.component.html',
  styleUrls: ['./pdf-handling.component.css']
})
export class PdfHandlingComponent implements OnInit {

  constructor(public snackBar: MdSnackBar) { }

  ngOnInit() {
  }

    openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

}
