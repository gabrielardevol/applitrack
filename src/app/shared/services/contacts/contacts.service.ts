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

    let filteredList = this.getByParams(
      { name: contact.name, company: contact.company }
    )
    if (filteredList) {
      this.notificationsService.createTemporaryNotification('Contact already exists')
      return filteredList[0]
    }
    return super.create(contact)
  }
}
