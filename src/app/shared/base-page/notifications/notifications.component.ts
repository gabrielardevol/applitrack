import { Component, inject } from '@angular/core';
import { Notification, NotificationService } from '@app/shared/services/notifications/notification-service';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {

  public notificationsService = inject(NotificationService)
  public notifications = this.notificationsService.$listValue

}
