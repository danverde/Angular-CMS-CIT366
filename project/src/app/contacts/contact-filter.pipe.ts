import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts.model';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]) {
    let filteredArray: Contact[] = [];

    filteredArray = contacts.filter((contact) => {
      contact.name.toLowerCase().includes(term.toLowerCase())
    });

    if (filteredArray.length < 1) {
      return contacts;
    }

    return filteredArray;
  }

}
