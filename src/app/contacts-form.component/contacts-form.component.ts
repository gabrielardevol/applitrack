import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { EMPTY_CONTACT_FORM } from '@app/shared/constants';
import { ContactsService } from '@app/shared/services/contacts/contacts.service';
import { NotificationService } from '@app/shared/services/notifications/notification-service';
import { ContactForm } from '@app/shared/types';

@Component({
  selector: 'app-contacts-form',
  imports: [FormField, ReactiveFormsModule],
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.scss',
})
export class ContactsFormComponent {

  EMPTY_CONTACT_FORM = EMPTY_CONTACT_FORM

  private contact = signal<ContactForm>(EMPTY_CONTACT_FORM)
  private contactsService = inject(ContactsService);
  private notificationsService = inject(NotificationService);

  public contactForm = form(this.contact, (schemaPath) => {
    required(schemaPath.name, { message: 'Required field' });
  })

  public submitButtonClicked: boolean = false;

  public submitForm() {
    // this.submitButtonClicked = true;
    if (this.contactForm().valid()) {
      this.contactsService.create(this.contactForm().value()); //tech debt: why is it not getting the property from EMPTY_FORM?
      this.contactForm().value.set(EMPTY_CONTACT_FORM)
      this.contactForm().reset()
      this.notificationsService.createTemporaryNotification('Contact succesfully created')
      this.submitButtonClicked = false;
    }
  }
}
