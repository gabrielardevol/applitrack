import { Component, inject } from '@angular/core';
import { ContactsService } from '@app/shared/services/contacts/contacts.service';
import { ContactsFormComponent } from "@app/contacts-form.component/contacts-form.component";

@Component({
  selector: 'app-contacts-page',
  imports: [ContactsFormComponent],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss',
})
export class ContactsPage {
  contactsService = inject(ContactsService);
  contacts = this.contactsService.$listValue
}
