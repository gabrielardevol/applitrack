import { inject, Injectable } from '@angular/core';
import { VacanciesService } from '@app/vacancies/vacancy-service';
import { ResponsesService } from '@app/responses/responses-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly responsesService = inject(ResponsesService);
  private readonly vacanciesService = inject(VacanciesService);
  public responsesCount = this.responsesService.$listValue().length
  public vacanciesCount = this.vacanciesService.$listValue().length
  //inject offer service and response service
  //store in a public variable the amount of application
  //store in a public variable the amount of reciprocated vacancies
  //store in a public variable the amount of interviews
  //store in a public variable the amount of successful job vacancies
  //store in a public variable the amount of responses
  //store in a public variable the average reciprocated salary
  //store in a public variable the matrix position x expertise x average salary x reciprocity
  //store in a public variable the matrix skills x frequency
}
