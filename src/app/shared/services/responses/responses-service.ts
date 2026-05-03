import { inject, Injectable } from '@angular/core';
import { Response, RESPONSE_TYPES, ResponseForm } from '../../types';
import { BaseService } from '../base-service';
import { NotificationService } from '@app/shared/services/notifications/notification-service';
import { InterviewService } from '@app/shared/services/interviews/interview.service';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService extends BaseService<Response, Response, ResponseForm> {

  notificationService = inject(NotificationService)
  interviewService = inject(InterviewService)
  constructor() {
    super('RESPONSES', '/responses')
  }

  override create(item: ResponseForm) {
    let createdItem = super.create(item)

    if (createdItem) {
      console.log('0', createdItem)

      this.notificationService.create({ message: 'Response succesfully registered.' })
      if (createdItem.type == RESPONSE_TYPES.INTERVIEW_SCHEDULE) {
        console.log(1, createdItem)
        let interview = item.interviewDate ? this.interviewService.create({
          responseId: item.id,
          scheduledDate: item.interviewDate
        }) : null
        interview ? this.notificationService.create({ message: 'Interview succesfully registered.' }) :
          this.notificationService.create({ message: 'Failed to register interview.' })
        console.log(2)
      }
    } else {
      this.notificationService.create({ message: 'Failed to register response.' })
      console.error('Error creating response')
    }
    return createdItem || null
  }

}
