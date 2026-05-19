import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';
import { Interview, InterviewCreation } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class InterviewService extends BaseService<Interview, Interview, InterviewCreation> {

  constructor() { super('INTERVIEW', '/interview') }

  getByDay(day: string) {
    let filteredByDay = this.$listValue().filter(i => {
      let scheduledDate = new Date(i.scheduledDate)
      console.log(`${scheduledDate.getFullYear()}-${scheduledDate.getMonth().toString().padStart(2, '0')}-${scheduledDate.getDate()}`, day)
      return day == `${scheduledDate.getFullYear()}-${(scheduledDate.getMonth() + 1).toString().padStart(2, '0')}-${scheduledDate.getDate()}`
    }
    )
    console.log(filteredByDay)
    return filteredByDay;
  }


}
