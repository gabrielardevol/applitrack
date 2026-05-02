import { computed, inject, Injectable } from '@angular/core';
import { VacanciesService } from '@app/vacancies/vacancy-service';
import { ResponsesService } from '@app/responses/responses-service';
import { InterviewService } from '@app/shared/services/interview.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly responsesService = inject(ResponsesService);
  private readonly vacanciesService = inject(VacanciesService);
  public readonly interviewsService = inject(InterviewService);
  public responsesCount = computed(() => this.responsesService.$listValue().length)
  public vacanciesCount = computed(() => this.vacanciesService.$listValue().length)
  public interviewsCount = computed(() => this.interviewsService.$listValue().length)
  //inject offer service and response service
  //store in a public variable the amount of reciprocated vacancies
  //store in a public variable the amount of interviews
  //store in a public variable the amount of successful job vacancies
  //store in a public variable the amount of responses
  //store in a public variable the average reciprocated salary
  //store in a public variable the matrix position x expertise x average salary x reciprocity
  //store in a public variable the matrix skills x frequency
}
