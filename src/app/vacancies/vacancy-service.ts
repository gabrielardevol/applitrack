import { inject, Injectable } from '@angular/core';
import { ResponsesService } from '../responses/responses-service';
import { Vacancy, VacancyForm, VacancyListItem } from '../shared/types';
import { BaseService } from '../shared/services/base-service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.development';
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
    createdVacancy && vacancy.location && this.adressToLatLon(vacancy.location, createdVacancy.id);
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

  async adressToLatLon(query: string, vacancyId: string) {
    let geocodeUrl = `https://geocode.maps.co/search?q=${query}&api_key=${environment.GEOCODE_API_KEY}`

    const data = await fetch(geocodeUrl, {
      method: 'POST',
    })

    await data.json().then((r) => {
      console.log(r),
        this.update({ geolocation: { lat: r[0]['lat'], lon: r[0]['lon'] } }, vacancyId)
    }
    )
  }
}
