import { inject, Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Offer, OfferForm, OfferListItem, Response } from '../core/types';
import { ResponsesService } from './responses-service';

@Injectable({
  providedIn: 'root',
})
export class OffersService extends BaseService<Offer, OfferListItem, OfferForm> {

  responsesService = inject(ResponsesService);
  constructor() {
    super('OFFERS', '/offers')
  }

  public override update(offer: Partial<Offer>, id: string): Offer | null {
    return super.update(offer, id)
  }

  public override getSingle(id: string): Offer | null {
    let offer: Offer | null = super.getSingle(id);

    if (!offer) return null;

    // let formattedResponses = offer?.responses.map(
    //   i => this.responsesService.getSingle(i as string)
    // ).filter(i => i != null)

    // let offerView: Offer = {
    //   ...offer,
    //   responses: formattedResponses
    // }
    return offer;
  }

  public getFilteredList(): OfferListItem[] {
    return super.getList()
  }

  public addResponse(responseId: string, offerId: string) {
    let offer = super.getSingle(offerId)
    console.log("offer", offer)
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
