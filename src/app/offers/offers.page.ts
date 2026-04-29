import { Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { OffersService } from './offers-service';
import { OfferDetail } from "./components/offer-detail/offer-detail";
import { OfferFormComponent } from '../shared/offer-form/offer-form.component';
import { ResponseFormComponent } from '@app/response-form/response-form';

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
