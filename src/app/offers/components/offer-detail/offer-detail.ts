import { Component, computed, ElementRef, inject, input, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { OffersService } from '../../../services/offers-service';
import { Offer, OfferForm } from '../../../core/types';
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

  viewOffer() {
    let offerResponse = this.offersService.getSingle(this.offerId())
    if (offerResponse.success) {
      this.modal()?.nativeElement.showModal()
      this.offer = offerResponse.item
    }
  }

}
