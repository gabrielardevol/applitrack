import { inject, Injectable } from '@angular/core';
import { ResponsesService } from '../responses/responses-service';
import { Vacancy, VacancyForm, VacancyListItem } from '../shared/types';
import { BaseService } from '../shared/services/base-service';

@Injectable({
  providedIn: 'root',
})
export class VacanciesService extends BaseService<Vacancy, VacancyListItem, VacancyForm> {

  responsesService = inject(ResponsesService);
  constructor() {
    super('VACANCIES', '/vacancies')
  }

  public override getSingle(id: string): Vacancy | null {
    let vacancy: Vacancy | null = super.getSingle(id);

    if (!vacancy) return null;

    return vacancy;
  }

  public getFilteredList(): VacancyListItem[] {
    return super.getList()
  }

  public override create(vacancy: VacancyForm) {
    let createdVacancy = super.create(vacancy)
    return createdVacancy

  }

  public override delete(offerId: string) {
    super.delete(offerId)

    // delete vacancy's responses
    // tech debt: might not work when persisting in server
    this.responsesService.$listValue().filter(o => o.vacancyId == offerId).forEach(
      o => this.responsesService.delete(o.id)
    )
  }

  public addResponse(responseId: string, offerId: string) {
    let vacancy = super.getSingle(offerId)
    if (!vacancy) return;
    if (Array.isArray(vacancy?.responseIds)) {
      vacancy.responseIds.push(responseId)
    } else {
      vacancy.responseIds = [responseId]
    }
    super.update({
      responseIds: vacancy?.responseIds
    }, offerId)
  }
}
