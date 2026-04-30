import { inject, Injectable } from '@angular/core';
import { ResponsesService } from '../responses/responses-service';
import { Offer, OfferForm, OfferListItem } from '../shared/types';
import { BaseService } from '../shared/services/base-service';

@Injectable({
  providedIn: 'root',
})
export class OffersService extends BaseService<Offer, OfferListItem, OfferForm> {

  responsesService = inject(ResponsesService);
  constructor() {
    super('OFFERS', '/offers')
  }

  // public override update(offer: Partial<Offer>, id: string): Offer | null {
  //   return super.update(offer, id)
  // }

  public override getSingle(id: string): Offer | null {
    let offer: Offer | null = super.getSingle(id);

    if (!offer) return null;

    return offer;
  }

  public getFilteredList(): OfferListItem[] {
    return super.getList()
  }

  public override create(offer: OfferForm) {
    let createdOffer = super.create(offer)
    return createdOffer

  }

  public addResponse(responseId: string, offerId: string) {
    let offer = super.getSingle(offerId)
    if (!offer) return;
    if (Array.isArray(offer?.responseIds)) {
      offer.responseIds.push(responseId)
    } else {
      offer.responseIds = [responseId]
    }
    super.update({
      responseIds: offer?.responseIds
    }, offerId)
  }
}
