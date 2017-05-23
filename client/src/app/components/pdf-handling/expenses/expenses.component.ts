import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs/Rx';

import { Message } from 'app/_models';
import { WebSocketService } from 'app/_services';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {

  private messages: Subject<Message>;
  private socket: Subscription;
  private url: string;

  constructor(
    private wsService: WebSocketService
  ) {
    this.socket = this.wsService.getMessages().subscribe((message: Message) => {
      console.debug('MESSAGE: ', message);
    });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.socket.unsubscribe();
  }

}
