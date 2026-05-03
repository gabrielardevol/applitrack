import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';
import { Interview, InterviewCreation } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class InterviewService extends BaseService<Interview, Interview, InterviewCreation> {

  constructor() { super('INTERVIEW', '/interview') }


}
