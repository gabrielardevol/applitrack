import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base-service';
import { Contact, ContactForm } from '@app/shared/types';
import { NotificationService } from '../notifications/notification-service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends BaseService<Contact, Contact, ContactForm> {

  notificationsService = inject(NotificationService)

  constructor() {
    super('CONTACTS', '/contacts')
  }

  override create(contact: ContactForm) {

    let existingContact = this.checkIfExists(contact)
    if (existingContact) {
      this.notificationsService.createTemporaryNotification('Contact already exists')
      return existingContact;
    } else {
      return super.create(contact)
    }
  }

  private checkIfExists(contact: ContactForm) {
    let filteredList = this.getByParams(
      { name: contact.name, company: contact.company }
    )
    if (filteredList) {
      return filteredList[0]
    } else {
      return false;
    }
  }
}
