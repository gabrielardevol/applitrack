import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';


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

  createTemporaryNotification(message: string, milliseconds: number = 10000) {
    let createdNotification = super.create({ message: message })
    if (createdNotification) {
      setTimeout(() => {
        super.delete(createdNotification.id);
        super.getList()
      }, milliseconds)
    }
  }

}
