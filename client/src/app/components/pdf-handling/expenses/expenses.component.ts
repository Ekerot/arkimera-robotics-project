import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription, Subject } from 'rxjs/Rx';

import { Message, FileResponse } from 'app/_models';
import { WebSocketService, AuthService, HttpService } from 'app/_services';

import { config } from 'app/_config/config';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput: ElementRef;

  private messages: Subject<Message>;
  private socket: Subscription;
  private url: string;
  private username: string

  public loading: boolean;
  public pdf: PDFDocumentProxy;
  public pdfSrc: string;
  public file: File;
  public filesToBookkeep: FileResponse[];

  constructor(
    private auth: AuthService,
    private httpService: HttpService,
    private wsService: WebSocketService
  ) {
    this.loading = false;
    this.username = this.auth.getLoggedInUsername();
    this.socket = this.wsService.getMessages(this.username).subscribe((message: Message) => {
      console.log('MESSAGE: ', message);
    });
  }

  ngOnInit() {
    this.getFilesReadyForExtraction();
  }

  ngOnDestroy(): void {
    this.socket.unsubscribe();
  }

  private onFileChanged($event: Event): void {
    this.loading = true;
    const files: File[] = [].slice.call((<HTMLInputElement>$event.target).files);

    this.httpService.uploadFiles(files)
    .subscribe(response => {
      console.debug('Files uploaded: ', response);
      this.loading = false;
    });
  }

  private onUpload(): void {
    this.fileInput.nativeElement.click();
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
      this.pdfSrc = config.webAPIBaseUrl + '/' + file.path;
      // this.bkService.announceBookkeep(file.FileID);
    }
  }

  private resetCurrentStatus(): void {
    this.file = null;
    this.filesToBookkeep = null;
    this.pdf = null;
    this.pdfSrc = null;
  }

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
