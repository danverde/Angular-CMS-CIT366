import { Injectable } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable()
export class ContactService {

   contacts: Contact[] = [];

  constructor() {
   this.contacts = MOCKCONTACTS;
     console.log(MOCKCONTACTS);
  }

   getContacts() {
      console.log(this.contacts.slice());
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
