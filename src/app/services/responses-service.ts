import { inject, Injectable } from '@angular/core';
import { Response, ResponseForm } from '../core/types';
import { BaseService } from './base-service';
import { OffersService } from './offers-service';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService extends BaseService<Response, Response, ResponseForm> {

  constructor() {
    super('RESPONSES', '/responses')
  }

}
