import { Component, OnInit } from '@angular/core';
//import { ngFor } from '@angular/common';
import { Contact } from '../contacts.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
contactList: Contact[] = [
    new Contact('1', 'Bro. Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '2028-496-3768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null),
];
    
  constructor() { }

  ngOnInit() {
  }

}
