import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable()
export class ContactService {
   contactSelectedEvent = new EventEmitter<Contact>();
   contacts: Contact[] = [];

  constructor() {
   this.contacts = MOCKCONTACTS;
  }

   getContacts() {
      return this.contacts.slice();
   }

   getContact(id: string) {
      this.contacts.forEach((contact) => {
         if (contact.id === id) {
            return contact;
         }
      });
      return null;
   }
}
