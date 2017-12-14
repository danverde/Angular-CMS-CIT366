import { Http, Response, Headers } from '@angular/Http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import 'rxjs/Rx';

@Injectable()
export class MessageService {
   messageChangeEvent = new EventEmitter<Message[]>();
   messages: Message[] = [];
   maxMessageId: number;

   constructor(private http: Http) {
      this.initMessages();
   }

   initMessages() {
      this.http.get('http://localhost:3000/messages')
      .map((response: Response) => {
          const msgs: Message[] = response.json();
          return msgs;
      }).subscribe((messages: Message[]) => {
       this.messages = messages;
       this.maxMessageId = this.getMaxId();
       this.messageChangeEvent.next([...this.messages]);
      });
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

   getMaxId (): number {
      let maxId = 0;
      this.messages.forEach((message: Message) => {
         const currId = +message.id;
         if (currId > maxId) {
            maxId = currId;
         }
      });
      return maxId;
   }

   addMessage(message: Message) {
      const strMsg =  JSON.stringify(message);
      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      this.http.post('/messages', strMsg, {headers: headers})
      .map((res) => {
          return res.json().obj;
      })
      .subscribe((messages: Message[]) => {
          this.messages = messages;
          this.initMessages();
      });
   }
}
