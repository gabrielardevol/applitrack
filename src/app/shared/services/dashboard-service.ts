import { inject, Injectable } from '@angular/core';
import { OffersService } from '@app/offers/offers-service';
import { ResponsesService } from '@app/responses/responses-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly responsesService = inject(ResponsesService);
  private readonly offersService = inject(OffersService);
  public responsesCount = this.responsesService.$listValue().length
  public offersCount = this.offersService.$listValue().length
  //inject offer service and response service
  //store in a public variable the amount of application
  //store in a public variable the amount of reciprocated offers
  //store in a public variable the amount of interviews
  //store in a public variable the amount of successful job offers
  //store in a public variable the amount of responses
  //store in a public variable the average reciprocated salary
  //store in a public variable the matrix position x expertise x average salary x reciprocity
  //store in a public variable the matrix skills x frequency
}
