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

  public override update(offer: Partial<Offer>, id: string): true | null {
    return super.update(offer, id)
  }

  public override getSingle(id: string): Offer | null {
    return super.getSingle(id)
  }

  public getFilteredList(): OfferListItem[] {
    return super.getList()
  }
}
