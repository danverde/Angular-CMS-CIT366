import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
   messageList: Message[] = [
      new Message ('1', 'Subject1', 'message1', 'Daniel Green'),
      new Message ('2', 'Subject2', 'message2', 'Daniel Green'),
      new Message ('3', 'Subject3', 'message3', 'Daniel Green'),
   ];
   
   onAddMessage(message: Message){
      this.messageList.push(message);
   }
   
  constructor() { }

  ngOnInit() {
  }

}
