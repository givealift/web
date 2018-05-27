import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import firebase, { Messaging } from '../_providers/firebase-provider';
@Injectable()
export class MessagingService {

  private readonly FIREBASE_TOKEN_SENT = "firebase_token_sent_to_server";
  private messaging: Messaging;
  incomingMessenge = new Subject();

  constructor() {
    this.setup();
  }

  async setup() {
    console.log("Initializing firebase...");
    this.messaging = firebase.messaging();
    await this.getPermission();
    await this.getToken();
    this.startReceivingMessages();
    this.monitorToken();
  }

  async getPermission() {
    console.log("Getting permissions...");
    try {
      await this.messaging.requestPermission();
      console.log('Notification permission granted.');
    } catch (err) {
      console.log('Unable to get permission to notify.', err);
    }
  }

  async getToken() {
    try {
      let token = await this.messaging.getToken();
      console.log("token", token);
      if (token && this.tokenSentToServer !== token) {
        await this.sendTokenToServer(token);
        this.tokenSentToServer = token;
      }
    } catch (err) {
      console.log('Unable to get token.', err);
    }
  }

  monitorToken() {
    let messaging = this.messaging;
    let self = this;
    messaging.onTokenRefresh(async () => {
      try {
        self.tokenSentToServer = false;
        await self.getToken();
      } catch (error) {
        console.log('Unable to retrieve refreshed token ', error);
      }
    });
  }

  async sendTokenToServer(token) {
    console.log("sending token to server...", token);
    // TODO: sent token to server with user id
  }

  set tokenSentToServer(token: string | boolean) {
    if (typeof token === "string") {
      localStorage.setItem(this.FIREBASE_TOKEN_SENT, token);
    }
    localStorage.removeItem(this.FIREBASE_TOKEN_SENT);
  }

  get tokenSentToServer(): string | boolean {
    return localStorage.getItem(this.FIREBASE_TOKEN_SENT) || false;
  }

  startReceivingMessages() {
    this.messaging.onMessage(payload => {
      console.log("Message received. ", payload);
      this.incomingMessenge.next(payload);
    });
  }
}
