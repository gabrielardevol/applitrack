import { Component, inject } from '@angular/core';
import { ContactsService } from '@app/shared/services/contacts/contacts.service';

@Component({
  selector: 'app-contacts-page',
  imports: [],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss',
})
export class ContactsPage {
  contactsService = inject(ContactsService);
  contacts = this.contactsService.$listValue
}
