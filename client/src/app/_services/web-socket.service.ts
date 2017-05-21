import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

import * as helpers from 'app/_helpers/helpers';

export class WebSocketService {

  // TODO: Change hardcoded 'admin' to actual current username. Will probably need decoding of jwt for this...
  private url = helpers.buildWebsocketUrl('admin');
  private socket;

  getMessages() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
}
