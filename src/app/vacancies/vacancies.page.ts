import { Component, inject } from '@angular/core';
import { VacanciesService } from '../shared/services/vacancies/vacancy-service';
import { VacancyDetail } from "./components/vacancy-detail/vacancy-detail";
import { VacancyFormComponent } from './vacancy-form/vacancy-form.component';
import { ResponseFormComponent } from '@app/responses/response-form/response-form';

@Component({
  selector: 'app-vacancies-page',
  imports: [VacancyDetail],
  templateUrl: './vacancies.page.html',
  styleUrl: './vacancies.page.scss',
})
export class VacanciesPage {
  private vacanciesService = inject(VacanciesService);
  public vacancies = this.vacanciesService.$listValue;


  deleteVacancy(id: string) {
    this.vacanciesService.delete(id)
  }

}
