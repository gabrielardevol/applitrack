import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Offer, OfferForm } from '../core/types';

@Injectable({
  providedIn: 'root',
})
export class OffersService extends BaseService<Offer, Offer, OfferForm, Partial<OfferForm>> {
  constructor() {
    super('OFFERS', '/offers')
  }
}
