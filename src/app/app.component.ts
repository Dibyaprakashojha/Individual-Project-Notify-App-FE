import { Component, NgZone, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'notify-fe';

  readonly VAPID_PUBLIC_KEY =
    'BPXfF4inLmB308YCDayrohRyKHJq5igRw7540Y7Rf0cvL_HCbTXOWXdA2Jc13-30ornem8dP3e05hvtWrN0bAy4';
  greeting: string = '';
  name: string = '';

  constructor(
    private swPush: SwPush,
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private webSocket: WebsocketService
  ) {}

  connect = () => {
    this.webSocket._connect();
  };

  sendMessage = () => {
    this.webSocket._send(this.name);
  };

  handleMessage = (message: any) => {
    this.greeting = message.body;
  };

  disconnect = () => {
    this.webSocket._disconnect();
  };

  // message = '';
  // messages!: any[];
  // socket!: WebSocket;
  // serverUrl: string = '/ws';
  // stompClient!: any;

  ngOnInit(): void {
    // this.messages = [];
    // this.socket = new WebSocket('ws://localhost:9090/topic/public');
    // this.socket.onmessage = (event) => {
    //   console.log('onmessage:' + event);
    //   this.zone.run(() => {
    //     this.addMessage(event.data);
    //   });
    // };
    // this.initializeWebSocketConnection();
  }
  // initializeWebSocketConnection(): any {
  //   console.log('connected to ws ...');

  //   const ws = new SockJS(this.serverUrl);

  //   this.stompClient = Stomp.over(ws);

  //   const that = this;
  //   this.stompClient.connect(
  //     {},
  //     (frame: any) => {
  //       console.log('Connected: ' + frame);
  //       that.stompClient.subscribe(
  //         `/topic/public`,
  //         (message: any) => {
  //           // let userId = message.body.split(' ')[0];
  //           // if (this.auth.readToken().userId != userId) {
  //           this.showMessage(JSON.parse(message.body));
  //           this.snackBar.open(message.body, '', {
  //             duration: 3000,
  //             verticalPosition: 'top',
  //             horizontalPosition: 'center',
  //           });
  //         }
  //         // }
  //       );
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // showMessage = (message: any) => {
  //   $('#message-container-table').prepend(
  //     `<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`
  //   );
  // };

  // addMessage(msg: any) {
  //   this.messages = [...this.messages, msg];
  //   console.log('messages::' + this.messages);
  // }
  // sendMessage() {
  //   console.log('sending message:' + this.message);
  //   this.socket.send(this.message);
  // }
}
