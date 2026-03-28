import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { OffersService } from '../../../services/offers-service';
import { Offer } from '../../../core/types';

@Component({
  selector: 'appli-offer-detail',
  imports: [],
  templateUrl: './offer-detail.html',
  styleUrl: './offer-detail.scss',
})
export class OfferDetail {
  modal = viewChild<ElementRef<HTMLDialogElement>>('dialog')
  private offersService = inject(OffersService);
  offerId = input.required<string>()
  offer?: Offer

  viewOffer() {
    let offerResponse = this.offersService.getSingle(this.offerId())
    if (offerResponse.success) {
      this.modal()?.nativeElement.showModal()
      this.offer = offerResponse.item
    }
  }

}
