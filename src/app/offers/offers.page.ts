import { Component, inject } from '@angular/core';
import { OfferFormComponent } from './components/offer-form.component';
import { OffersService } from '../services/offers-service';

@Component({
  selector: 'app-offers-page',
  imports: [OfferFormComponent],
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
