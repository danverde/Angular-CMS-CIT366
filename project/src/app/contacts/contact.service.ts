import { Http, Response, Headers } from '@angular/Http';
import { Subject } from 'rxjs/Subject';
import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import 'rxjs/Rx';

@Injectable()
export class ContactService {
   contactSelectedEvent = new EventEmitter<Contact>(); // to be deleted?
   contactListChangedEvent = new Subject<Contact[]>();
   contacts: Contact[] = [];
   maxContactId: number;

  constructor(private http: Http) {
    this.initContacts();
    this.maxContactId = this.getMaxId();
  }

  initContacts() {
    this.http.get('https://cit-366.firebaseio.com/contacts.json')
    .map((response: Response) => {
        const contacts: Contact[] = response.json();
        return contacts;
    }).subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next([...this.contacts]);
        });
    }

    storeContacts() {
        const contacts = JSON.stringify(this.contacts);
        this.http.put('https://cit-366.firebaseio.com/contacts.json', contacts)
        .subscribe(() => {
            this.contactListChangedEvent.next([...this.contacts]);
        });
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
    if (newContact === undefined || newContact === null) {
        return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
   }
}
