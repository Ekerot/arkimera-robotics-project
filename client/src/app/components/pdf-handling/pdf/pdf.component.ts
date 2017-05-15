import { Component, OnInit } from '@angular/core';

import { FileResponse } from 'app/_models';
import { HttpService } from '../../../_services/http.service';
import { config } from 'app/_config/config';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  public zoom = '0.6'; // Starting zoom value
  public page = 1; // Starting page
  public pdfOptions: any = {
    data: null,
    url: null
  };
  public file: File;
  public loading: boolean;
  public fileUploaded: boolean;
  public filesToBookkeep: FileResponse[];

  // TODO: How to handle more than one page? Vertical slider? How do we get numPages?

  constructor(private httpService: HttpService) {
    this.loading = false;
    this.fileUploaded = false;
  }

  ngOnInit() {
    this.getFilesReadyForExtraction();
  }

  /**
   * Handles reading of selected file.
   * Sets current/working file to read file
   *
   * @param {Event} $event
   *
   * @memberof PdfComponent
   */
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
        this.pdfOptions.data = null;
        this.fileUploaded = true;
        this.getFilesReadyForExtraction();
        this.loading = false;
      });
  }

  /**
   * Resets pdf-data
   * @memberof PdfComponent
   */
  onCancel(): void {
    this.pdfOptions.data = null;
  }

  /**
   * Get files ready for extraction from webAPI
   * Also sets current file to item 0 in "extractableFilesArray"
   *
   * @memberof PdfComponent
   */
  getFilesReadyForExtraction(): void {
    this.loading = true;
    this.httpService
      .getFilesReadyForExtraction()
      .subscribe(files => {
        this.filesToBookkeep = files;
        this.setCurrentFileData();
        this.loading = false;
      });
  }

  /**
   * Can be called anywhere to set current/working file to item 0 in "extractableFilesArray"
   *
   * @memberof PdfComponent
   */
  setCurrentFileData(): void {
    if (this.filesToBookkeep.length > 0) {
      const file: FileResponse = this.filesToBookkeep[0];
      delete this.pdfOptions.data;
      this.pdfOptions.url = config.webAPIBaseUrl + '/' + file.path;
    }
  }
}
