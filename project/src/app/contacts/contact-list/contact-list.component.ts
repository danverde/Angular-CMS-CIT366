import { Component, OnInit, EventEmitter } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }
}
