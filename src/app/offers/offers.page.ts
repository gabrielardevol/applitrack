import { Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
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

  modal = viewChild<ElementRef<HTMLDialogElement>>('dialog')

  deleteOffer(id: string) {
    this.offersService.delete(id)
  }

  viewOffer(id: string) {
    console.log(
      this.offersService.getSingle(id)
    )
    this.modal()?.nativeElement.showModal()

  }
}
