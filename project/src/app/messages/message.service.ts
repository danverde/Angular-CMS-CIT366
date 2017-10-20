import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable()
export class MessageService {
   messageChangeEvent = new EventEmitter<Message[]>();
   messages: Message[] = [];

   constructor() {
      this.messages = MOCKMESSAGES;
   }

   getMessages() {
      return this.messages;
   }

   getMessage(id: string) {
      let msg: Message;
      this.messages.forEach((message) => {
         if (message.id === id) {
            msg = message;
         }
      });
      return msg;
   }

   addMessage(message: Message) {
      this.messages.push(message);
      this.messageChangeEvent.emit(this.messages.slice());
   }
}
