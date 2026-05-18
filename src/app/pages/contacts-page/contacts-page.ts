import { Component, inject } from '@angular/core';
import { ContactsService } from '@app/shared/services/contacts/contacts.service';
import { ContactsFormComponent } from "@app/contacts-form/contacts-form.component";
import { ContactDetail } from "@app/contact-detail/contact-detail";

@Component({
  selector: 'app-contacts-page',
  imports: [ContactsFormComponent, ContactDetail],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss',
})
export class ContactsPage {
  public selectedContact?: string;

  contactsService = inject(ContactsService);
  contacts = this.contactsService.$listValue
}
