import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Offer, OfferForm, OfferListItem } from '../core/types';

@Injectable({
  providedIn: 'root',
})
export class OffersService extends BaseService<Offer, OfferListItem, OfferForm> {
  constructor() {
    super('OFFERS', '/offers')
  }
}
