import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';
import { Contact, ContactForm } from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends BaseService<Contact, Contact, ContactForm> {
  constructor() {
    super('CONTACTS', '/contacts')
  }
}
