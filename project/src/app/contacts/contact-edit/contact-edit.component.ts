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
  hasGroup = false;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  onSubmit(form: NgForm) {
    const values = form.value;

    const newContact = new Contact(null, values.name, values.email, values.phone, values.imageUrl, null);

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
        // this.groupContacts = [...this.contact.group];
        console.log(this.contact);
      }
    });
  }
}
