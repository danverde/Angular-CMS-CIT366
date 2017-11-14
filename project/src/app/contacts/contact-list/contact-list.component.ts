import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private subscription: Subscription;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactListChangedEvent
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
