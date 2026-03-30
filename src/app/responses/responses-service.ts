import { inject, Injectable } from '@angular/core';
import { Response, ResponseForm } from '../shared/types';
import { OffersService } from '../offers/offers-service';
import { BaseService } from '../shared/services/base-service';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService extends BaseService<Response, Response, ResponseForm> {

  constructor() {
    super('RESPONSES', '/responses')
  }

}
