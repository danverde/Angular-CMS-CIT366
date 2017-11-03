import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable()
export class ContactService {
   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new EventEmitter<Contact[]>();
   contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

   getContacts() {
      return [...this.contacts];
   }

   getContact(id: string) {
      let cont: Contact;
      this.contacts.forEach((contact) => {
         if (contact.id === id) {
             cont = contact;
         }
      });
      return cont;
   }

   deleteContact(contact: Contact) {
    if (contact === null) {
        return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    console.log([...this.contacts]);
    this.contactChangedEvent.emit([...this.contacts]);
   }
}
