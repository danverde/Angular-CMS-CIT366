import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
   @ViewChild('subject') subjectInputRef: ElementRef;
   @ViewChild('msgText') msgTextInputRef: ElementRef;
   @Output() messageSent = new EventEmitter<Message>();
   currentSender = "Daniel Green";
  constructor() { }

  ngOnInit() {
  }

   onSendMessage(){
      const mySubject = this.subjectInputRef.nativeElement.value;
      const myMsgText = this.msgTextInputRef.nativeElement.value;
      const newMessage = new Message ('1', mySubject, myMsgText, this.currentSender);
      this.messageSent.emit(newMessage);
   }
   
   onClear(){
    this.subjectInputRef.nativeElement.value = '';  
    this.msgTextInputRef.nativeElement.value = '';  
   }
   
}
