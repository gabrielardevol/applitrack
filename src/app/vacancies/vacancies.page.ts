import { Component, computed, inject, NgModule, signal, WritableSignal } from '@angular/core';
import { VacanciesService } from '../shared/services/vacancies/vacancy-service';
import { VacancyDetail } from "./components/vacancy-detail/vacancy-detail";
import { NgClass } from '@angular/common';
import { VacancyListItem } from '@app/shared/types';
import { form } from '@angular/forms/signals';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacancies-page',
  providers: [NgModule],
  imports: [VacancyDetail, NgClass, ReactiveFormsModule],
  templateUrl: './vacancies.page.html',
  styleUrl: './vacancies.page.scss',
  styles: `:host {display: flex; flex-flow: column; height: 100%}`
})
export class VacanciesPage {
  private vacanciesService = inject(VacanciesService);

  private sortBy: WritableSignal<{ property: keyof VacancyListItem; order: 'ASC' | 'DESC' }> = signal({ property: 'createdAt', order: 'ASC' })

  sortPropertyFC = new FormControl('createdAt')
  sortOrderFC = new FormControl('ASC')

  public vacancies = computed(() => [this.vacanciesService.$listValue().sort(
    (a, b) => {
      let comparison = (a as any)[this.sortBy().property].localeCompare((b as any)[this.sortBy().property]);
      return comparison;
    }
  )].map(items => {
    return this.sortBy().order == 'ASC' ? items.reverse() : items
  })[0]);
  view: 'table' | 'grid' = 'table';

  deleteVacancy(id: string) {
    this.vacanciesService.delete(id)
  }

  onSortChanges() {
    this.sortBy.update(() => {
      return {
        property: this.sortPropertyFC.value as keyof VacancyListItem,
        order: this.sortOrderFC.value as 'ASC' | 'DESC'
      }
    }
    )
  }

}
