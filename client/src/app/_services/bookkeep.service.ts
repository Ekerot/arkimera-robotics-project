import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BookkeepService {

  private bookkeepAnnouncedSource = new Subject<number>();
  private bookkeepConfirmedSource = new Subject<number>();

  bookkeepAnnounced$ = this.bookkeepAnnouncedSource.asObservable();
  bookkeepConfirmed$ = this.bookkeepConfirmedSource.asObservable();

  announceBookkeep(fileId: number) {
    this.bookkeepAnnouncedSource.next(fileId);
  }

  confirmBookkeep(fileId: number) {
    this.bookkeepConfirmedSource.next(fileId);
  }
}
