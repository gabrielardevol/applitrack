import { Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OffersService } from '../services/offers-service';
import { OfferDetail } from "./components/offer-detail/offer-detail";

@Component({
  selector: 'app-offers-page',
  imports: [OfferFormComponent, OfferDetail],
  templateUrl: './offers.page.html',
  styleUrl: './offers.page.scss',
})
export class OffersPage {
  private offersService = inject(OffersService);
  public offers = this.offersService.$listValue;


  deleteOffer(id: string) {
    this.offersService.delete(id)
  }

}
