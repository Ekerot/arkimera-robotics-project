import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

import { config } from 'app/_config/config';
import { Message } from 'app/_models';

export class WebSocketService {

  private url = config.webAPISocketUrl;
  private socket: SocketIOClient.Socket;

  getMessages(username: string): Observable<Message> {
    const observable = new Observable(observer => {
      // Open up a new websocket
      this.socket = io(this.url);

      // Connect to channel
      this.socket.emit('open channel', username);

      // Listen for extracted events
      this.socket.on('extracted', (data) => {
        const message: Message = {
          fileId: data
        }
        observer.next(message);
      });

      return () => {
        this.socket.disconnect();
      }
    });

    return observable;
  }
}
