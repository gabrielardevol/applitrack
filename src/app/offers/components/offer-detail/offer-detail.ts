import { Component, computed, ElementRef, inject, input, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { OffersService } from '../../../services/offers-service';
import { Offer, OFFER_MODALITIES, OFFER_TYPES } from '../../../core/types';
import { form, required, FormField } from '@angular/forms/signals';
import { EMPTY_OFFER_FORM } from '../../../core/constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'appli-offer-detail',
  imports: [FormField, DatePipe],
  templateUrl: './offer-detail.html',
  styleUrl: './offer-detail.scss',
})
export class OfferDetail {
  modal = viewChild<ElementRef<HTMLDialogElement>>('dialog')
  private offersService = inject(OffersService);
  offerId = input.required<string>()
  offer: WritableSignal<Offer | null> = signal(null);
  updating: boolean = false;
  public readonly OFFER_TYPES = OFFER_TYPES;
  public readonly OFFER_MODALITIES = OFFER_MODALITIES;

  public offerForm = form(signal(EMPTY_OFFER_FORM), (schemaPath) => {
    required(schemaPath.role, { message: 'Required field' });
    required(schemaPath.type, { message: 'Required field' });
    required(schemaPath.company, { message: 'Required field' });
  })

  viewOffer() {
    let offerDetail = this.offersService.getSingle(this.offerId())
    if (offerDetail) {
      this.modal()?.nativeElement.showModal()
      this.offer.set(offerDetail)
      this.offerForm().value.set(this.offer()!)
    }

    console.log(offerDetail)
  }

  updateOffer() {

    this.offersService.update(this.offerForm().value() as Partial<Offer>, this.offer()!.id)

    this.offer.set(
      {
        platform: this.offerForm().value().platform,
        skillsMust: this.offerForm().value().skillsMust,
        skillsPlus: this.offerForm().value().skillsPlus,
        softSkills: this.offerForm().value().softSkills,
        recruiters: this.offerForm().value().recruiters,
        originalText: this.offerForm().value().originalText,
        salaryRange: this.offerForm().value().salaryRange,
        role: this.offerForm().value().role,
        type: this.offerForm().value().type,
        modality: this.offerForm().value().modality,
        location: this.offerForm().value().location,
        company: this.offerForm().value().company,
        id: this.offer()!.id,
        date: this.offer()!.date,
        status: this.offerForm().value().status,
        responses: this.offer()!.responses,
        responseIds: this.offer()!.responseIds,
        annotations: this.offer()!.annotations,
        createdAt: this.offer()!.createdAt
      }
    );
  }
}
