import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from '@env/environment.development';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}
@Injectable({
  providedIn: 'root',
})
export class EchoService {
  private echo: Echo<any> = new Echo<any>({
    broadcaster: environment.pusher.broadcaster,
    key: environment.pusher.key,
    wsHost: environment.pusher.wsHost,
    wsPort: environment.pusher.wsPort,
    wssPort: environment.pusher.wsPort,
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: environment.pusher.cluster,
    encrypted: false,
    authEndpoint: environment.pusher.authEndpoint,
    auth: {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/json',
      },
    },
  });
  constructor() {
    window.Pusher = Pusher;
  }

  listenPrivateChannel(
    channel: string,
    event: string,
    callback?: (data: any) => void,
  ) {
    this.echo.private(channel).listen(event, (data: any) => {
      if(callback) {
        callback(data);

      }
    });
  }

  listenPublicChannel(
    channel: string,
    event: string,
    callback: (data: any) => void,
  ) {
    this.echo.channel(channel).listen(event, (data: any) => {
      callback(data);
    });
  }

  listenPresenceChannel(
    channel: string,
    event: string,
    callback: (data: any) => void,
  ) {
    this.echo.join(channel).listen(event, (data: any) => {
      callback(data);
    });
  }
}
