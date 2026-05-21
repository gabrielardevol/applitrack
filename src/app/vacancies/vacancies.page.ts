import { Component, computed, inject, NgModule, signal, WritableSignal } from '@angular/core';
import { VacanciesService } from '../shared/services/vacancies/vacancy-service';
import { VacancyDetail } from "./components/vacancy-detail/vacancy-detail";
import { NgClass, NgStyle } from '@angular/common';
import { VacancyListItem } from '@app/shared/types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { VACANCY_STATUS_DISPLAY } from '@app/shared/constants';
import { debounceTime, distinctUntilChanged, of, pipe } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-vacancies-page',
  providers: [NgModule],
  imports: [VacancyDetail, NgClass, ReactiveFormsModule, NgStyle],
  templateUrl: './vacancies.page.html',
  styleUrl: './vacancies.page.scss',
  styles: `:host {display: flex; flex-flow: column; height: 100%}`
})
export class VacanciesPage {
  private vacanciesService = inject(VacanciesService);

  public selectedVacancy?: string;
  public viewDetail: boolean = false;
  private sortBy: WritableSignal<{ property: keyof VacancyListItem; order: 'ASC' | 'DESC' }> = signal({ property: 'createdAt', order: 'ASC' })

  sortPropertyFC = new FormControl('createdAt')
  sortOrderFC = new FormControl('ASC')
  searchFC = new FormControl('')
  // searchString: WritableSignal<string> = signal('')
  searchString = toSignal(this.searchFC.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ), { initialValue: '' })


  favouriteVacancies: WritableSignal<{ id: string, featured: boolean }[]> = signal([])

  public vacancies = computed(() => [this.vacanciesService.getFilteredList(this.searchString() || '').map(i => {
    //locally updates 'favourite' icon
    let newItem = i;
    this.favouriteVacancies().map(
      fv => {
        if (fv.id == i.id) {
          newItem = { ...i, featured: fv.featured }
        }
      }
    );
    return newItem;
    // ------------------------------
  }).sort(
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

  getStatusString(key: keyof VACANCY_STATUS_DISPLAY | string) {
    return (VACANCY_STATUS_DISPLAY as any)[key]
  }

  featureVacancy(id: string, featured: boolean) {
    this.vacanciesService.update(
      { featured: featured }, id
    );
    let objCopy = this.favouriteVacancies()
    let onlyIds: string[] = objCopy.map(i => i.id);
    let idIsThereAlready = onlyIds.find(i => i == id);
    if (idIsThereAlready) {
      objCopy = objCopy.filter(i => i.id !== id);
    }
    this.favouriteVacancies.set([
      ...objCopy,
      {
        id: id, featured: featured
      }
    ])
  }

  formatDate(date: string | Date) {
    let ddate = new Date(date);
    return ddate.toLocaleDateString()
  }

}
