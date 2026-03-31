import { Injectable } from '@angular/core';
import { Response, ResponseForm } from '../shared/types';
import { BaseService } from '../shared/services/base-service';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService extends BaseService<Response, Response, ResponseForm> {

  constructor() {
    super('RESPONSES', '/responses')
  }

}
