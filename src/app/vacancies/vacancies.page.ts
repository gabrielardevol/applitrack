import { Component, computed, inject, NgModule, signal } from '@angular/core';
import { VacanciesService } from '../shared/services/vacancies/vacancy-service';
import { VacancyDetail } from "./components/vacancy-detail/vacancy-detail";
import { NgClass } from '@angular/common';
import { VacancyListItem } from '@app/shared/types';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-vacancies-page',
  providers: [NgModule],
  imports: [VacancyDetail, NgClass],
  templateUrl: './vacancies.page.html',
  styleUrl: './vacancies.page.scss',
})
export class VacanciesPage {
  private vacanciesService = inject(VacanciesService);

  private sortBy = signal<{ property: keyof VacancyListItem; order: 'ASC' | 'DESC' }>({ property: 'title', order: 'DESC' })

  public sortForm = form(this.sortBy, (schemaPath) => {
    // required(schemaPath.role, { message: 'Required field' });
  })

  public vacancies = computed(() => this.vacanciesService.$listValue().sort(
    (a, b) => {
      let comparison = (a as any)[this.sortBy().property].localeCompare((b as any)[this.sortBy().property]);
      return this.sortBy().order == 'ASC' ? comparison : !comparison
    }
  ));
  view: 'table' | 'grid' = 'table';

  deleteVacancy(id: string) {
    this.vacanciesService.delete(id)
  }

}
