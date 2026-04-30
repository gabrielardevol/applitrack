import { Injectable } from '@angular/core';
import { BaseService } from './base-service';


export type Alert = {
  id: string,
  message: string,
  createdAt: Date,
  removedAt?: Date,

}

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService<Alert, Alert, Alert> {
  constructor() {
    super('ALERTS', '/alerts')
  }
}
