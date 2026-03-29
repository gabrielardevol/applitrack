import { Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OffersService } from '../services/offers-service';
import { OfferDetail } from "./components/offer-detail/offer-detail";
import { ResponseFormComponent } from "./components/response-form/response-form.component";

@Component({
  selector: 'app-offers-page',
  imports: [OfferFormComponent, OfferDetail, ResponseFormComponent],
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
