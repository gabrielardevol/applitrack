import { Component } from '@angular/core';
import { OfferFormComponent } from './components/offer-form.component';

@Component({
  selector: 'app-offers-page',
  imports: [OfferFormComponent],
  templateUrl: './offers.page.html',
  styleUrl: './offers.page.scss',
})
export class OffersPage { }
