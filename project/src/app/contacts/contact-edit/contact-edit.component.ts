import { Router, Params, ActivatedRoute } from '@angular/router';
import { ContactService } from './../contact.service';
import { Contact } from './../contacts.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode = false;
  invalidGroupContact: boolean;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (this.originalContact === null || this.originalContact === undefined) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if (this.contact.group !== null && this.contact.group !== undefined) {
        this.groupContacts = [...this.contact.group];
      }
    });
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    console.log(form.value);
    const newContact = new Contact(null, values.name, values.email, values.phone, values.imageUrl, this.groupContacts);

    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

  isInvalidContact(newContact: Contact) {
    console.log('isInvalidContact Called');
    let isInvalid = false;
    if (!newContact || newContact.id === this.contact.id) {
      isInvalid = true;
    }

    this.groupContacts.forEach((contact) => {
      if (newContact.id === contact.id) {
        isInvalid = true;
      }
    });

    return isInvalid;
  }

  addToGroup($event: any) {
    console.log('addToGroup Called');
    const selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem (idx: number) {
    console.log('onRemoveItem called');
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}
