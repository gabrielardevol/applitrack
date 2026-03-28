import { Component, computed, ElementRef, inject, input, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { OffersService } from '../../../services/offers-service';
import { Offer, OFFER_MODALITIES, OFFER_TYPES, OfferForm } from '../../../core/types';
import { form, required, FormField } from '@angular/forms/signals';
import { EMPTY_OFFER_FORM } from '../../offers.constants';

@Component({
  selector: 'appli-offer-detail',
  imports: [FormField],
  templateUrl: './offer-detail.html',
  styleUrl: './offer-detail.scss',
})
export class OfferDetail {
  modal = viewChild<ElementRef<HTMLDialogElement>>('dialog')
  private offersService = inject(OffersService);
  offerId = input.required<string>()
  offer?: Offer;
  updating: boolean = false;
  public readonly OFFER_TYPES = OFFER_TYPES;
  public readonly OFFER_MODALITIES = OFFER_MODALITIES;

  public offerForm = form(signal(EMPTY_OFFER_FORM), (schemaPath) => {
    required(schemaPath.role, { message: 'Required field' });
    required(schemaPath.type, { message: 'Required field' });
    required(schemaPath.company, { message: 'Required field' });
  })

  viewOffer() {
    let offerResponse = this.offersService.getSingle(this.offerId())
    if (offerResponse.success) {
      this.modal()?.nativeElement.showModal()
      this.offer = offerResponse.item
      this.offerForm().value.set(this.offer!)
    }
  }

  updateOffer() {
    this.offersService.update(this.offerForm().value())
  }

}
