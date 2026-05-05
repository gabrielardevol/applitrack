import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';
import { Contact, ContactCreation } from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends BaseService<Contact, Contact, ContactCreation> {
  constructor() {
    super('CONTACTS', '/contacts')
  }
}
