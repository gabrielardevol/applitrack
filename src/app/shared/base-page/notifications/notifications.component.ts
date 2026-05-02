import { Component, inject } from '@angular/core';
import { Notification, NotificationService } from '@app/shared/services/notification-service';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {

  private notificationsService = inject(NotificationService)
  public notifications = this.notificationsService.$listValue

  public createDummyNotification() {
    this.notificationsService.create({ message: 'dummyNotification' })
  }
}
