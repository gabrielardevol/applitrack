import { Injectable } from '@angular/core';
import { BaseService } from './base-service';


export type Notification = {
  id: string,
  message: string,
  createdAt: Date,
  removedAt?: Date,

}

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService<Notification, Notification, { message: string }> {
  constructor() {
    super('NOTIFICATIONS', '/notifications')
  }

}
