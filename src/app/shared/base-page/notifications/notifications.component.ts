import { Component, inject } from '@angular/core';
import { Notification, NotificationService } from '@app/shared/services/alert-service';

@Component({
  selector: 'appli-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {

  private notificationsService = inject(NotificationService)
  public notifications = this.notificationsService.$listValue

  public createDummyNotification() {
    let dummyNotification: Notification = {
      id: '', //tech debt; base-service creation type does not need this property
      message: 'Lorem ipsum',
      createdAt: new Date() //tech debt; base-service creation type does not need this property
    }
    this.notificationsService.create(dummyNotification)
  }
}
