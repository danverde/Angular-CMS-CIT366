import { Subject } from 'rxjs/Subject';
import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable()
export class ContactService {
   contactSelectedEvent = new EventEmitter<Contact>(); // to be deleted?
   // contactChangedEvent = new EventEmitter<Contact[]>(); // to be deleted?
   contactListChangedEvent = new Subject<Contact[]>();
   contacts: Contact[] = [];
    maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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

   getMaxId (): number {
    let maxId = 0;
    this.contacts.forEach((contact: Contact) => {
        const currId = +contact.id;
        if (currId > maxId) {
            maxId = currId;
        }
    });
    return maxId;
   }

   addContact (newContact: Contact) {
    if (newContact === undefined || newContact === null){
        return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListChangedEvent.next([...this.contacts]);
   }

   updateContact(originalContact: Contact, newDoc: Contact) {
    if (originalContact === null || originalContact === undefined || newDoc === null || newDoc === undefined) {
        return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }

    newDoc.id = originalContact.id;
    this.contacts[pos] = newDoc;
    this.contactListChangedEvent.next([...this.contacts]);
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
    this.contactListChangedEvent.next([...this.contacts]);
   }
}
