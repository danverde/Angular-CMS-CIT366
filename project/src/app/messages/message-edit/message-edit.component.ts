import { Component, OnInit, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
   @ViewChild('subject') subjectInputRef: ElementRef;
   @ViewChild('msgText') msgTextInputRef: ElementRef;
   currentSender = '4'; // WHAT TO DO ABOUT THIS??

   constructor(private messageService: MessageService) {
   }

   ngOnInit() {
   }

   onSendMessage() {
      const mySubject = this.subjectInputRef.nativeElement.value;
      const myMsgText = this.msgTextInputRef.nativeElement.value;
      const newMessage = new Message ('20', mySubject, myMsgText, this.currentSender);
      this.messageService.addMessage(newMessage);
   }

   onClear() {
      this.subjectInputRef.nativeElement.value = '';
      this.msgTextInputRef.nativeElement.value = '';
   }

}
