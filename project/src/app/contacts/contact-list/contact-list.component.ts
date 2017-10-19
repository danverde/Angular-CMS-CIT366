import { Component, OnInit, EventEmitter } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
   //providers: [ContactService]
})
export class ContactListComponent implements OnInit {
  
  contacts: Contact[];
    
  constructor(private contactService: ContactService) {
     this.contacts = contactService.getContacts();
  }

  ngOnInit() {
  }

  onContactSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }

}
