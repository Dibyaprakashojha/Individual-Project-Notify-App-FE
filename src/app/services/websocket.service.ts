import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  webSocketEndPoint: string = '/ws';
  topic: string = '/topic/public';
  stompClient: any;

  constructor() {}

  _connect = () => {
    console.log('Initialize WebSocket Connection');
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(
      {},
      (frame: any) => {
        _this.stompClient.subscribe(_this.topic, (sdkEvent: any) => {
          _this.onMessageReceived(sdkEvent);
        });
        _this.stompClient.reconnect_delay = 2000;
      },
      (error: Error) => {
        console.log('errorCallBack -> ' + error);
        setTimeout(() => {
          this._connect();
        }, 5000);
      }
    );
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: any) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/message', {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {
    console.log('Message Recieved from Server :: ' + message);
    // this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}
