import { DatePipe } from '@angular/common';
import { Component, ElementRef, inject, input, output, signal, viewChild, WritableSignal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AnnotationsComponent } from '@app/shared/components/annotations/annotations.component';
import { EMPTY_CONTACT_FORM } from '@app/shared/constants';
import { ContactsService } from '@app/shared/services/contacts/contacts.service';
import { ANNOTATION_ENTITY_TYPES, Contact } from '@app/shared/types';

@Component({
  selector: 'app-contact-detail',
  imports: [FormField, DatePipe, AnnotationsComponent],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.scss',
})
export class ContactDetail {
  contact: WritableSignal<Contact | null> = signal(null);
  modal = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  onClose = output<void>();

  contactsService = inject(ContactsService)
  contactId = input.required<string>();
  updating: boolean = false;

  public contactForm = form(signal(EMPTY_CONTACT_FORM), (schemaPath) => {
    required(schemaPath.name, { message: 'Required field' });
  })
  viewContact() {
    let contactDetail = this.contactsService.getSingle(this.contactId())
    if (contactDetail) {
      this.modal()?.nativeElement.showModal()
      this.contact.set(contactDetail)
      this.contactForm().value.set(this.contact()!)
    } else {
      //handle error
    }
  }
  ngOnInit() {
    this.viewContact()
  }

  updateContact() {
    this.contactsService.update(this.contactForm().value() as Partial<Contact>, this.contact()!.id)
    this.contact.set({

      createdAt: this.contact()!.createdAt,
      id: this.contact()!.id,
      name: this.contactForm().value().name,
      company: this.contactForm().value().company,
      mail: this.contactForm().value().mail,
      phone: this.contactForm().value().phone,

      position: this.contactForm().value().position

    }
    );
  }

  ANNOTATION_ENTITY_TYPES = ANNOTATION_ENTITY_TYPES
}
