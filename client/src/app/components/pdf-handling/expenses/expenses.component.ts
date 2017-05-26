import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription, Subject } from 'rxjs/Rx';

import { FileResponse, Message } from 'app/_models';
import { WebSocketService, AuthService, HttpService } from 'app/_services';

import { config } from 'app/_config/config';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput: ElementRef;

  // Websocket properties
  private socket: Subscription;
  private username: string

  // Component specific properties
  public loading: boolean;
  public filesUploading: boolean;
  public pdfSrc: string;
  public selectedFile: FileResponse;
  public filesToBookkeep: FileResponse[];

  constructor(
    private auth: AuthService,
    private httpService: HttpService,
    private wsService: WebSocketService
  ) {
    this.loading = false;
    this.filesUploading = false;
    this.username = this.auth.getLoggedInUsername();
    this.filesToBookkeep = [];

    this.socket = this.wsService.getMessages(this.username)
      .subscribe((message: Message) => {
        this.httpService.getExtractedData(message.fileId)
          .subscribe((file: FileResponse) => {
            this.filesToBookkeep.push(file);
            this.setSelectedFile(file);
          })
      });
  }

  ngOnInit() {
    this.getFilesReadyForExtraction();
  }

  ngOnDestroy(): void {
    this.socket.unsubscribe();
  }

  onFileChanged($event: Event): void {
    this.filesUploading = true;
    const files: File[] = [].slice.call((<HTMLInputElement>$event.target).files);

    if (files && files.length > 0) {
      this.httpService.uploadFiles(files)
        .subscribe(response => {
          this.filesUploading = false;
        });
    }
  }

  onUpload(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Get files ready for extraction from webAPI
   * Also sets current file to item 0 in "filesToBookkeep"
   *
   * @memberof PdfComponent
   */
  getFilesReadyForExtraction(): void {
    this.loading = true;
    this.httpService
      .getFilesReadyForExtraction()
      .subscribe(files => {
        if (files && files.length > 0) {
          this.filesToBookkeep = files;
          this.setSelectedFile(this.filesToBookkeep[0]);
        }
        this.loading = false;
      });
  }

  /**
   * Can be called anywhere to set selected file
   *
   * @memberof PdfComponent
   */
  setSelectedFile(file: FileResponse): void {
    if (!this.selectedFile) {
      this.selectedFile = file;
      this.pdfSrc = config.webAPIBaseUrl + '/' + file.path;
    }
  }

  resetCurrentStatus(): void {
    this.selectedFile = null;
    this.filesToBookkeep = null;
    this.pdfSrc = null;
  }

  onChangeSelectedFile(): void {
    this.pdfSrc = config.webAPIBaseUrl + '/' + this.selectedFile.path;
  }

}
