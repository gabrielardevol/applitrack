import { Component, computed, ElementRef, inject, input, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { VacanciesService as VacanciesService } from '../../vacancy-service';
import { form, required, FormField } from '@angular/forms/signals';
import { DatePipe } from '@angular/common';
import { Vacancy, VACANCY_MODALITIES, VACANCY_TYPES } from '../../../shared/types';
import { EMPTY_VACANCY_FORM } from '../../../shared/constants';

@Component({
  selector: 'appli-vacancy-detail',
  imports: [FormField, DatePipe],
  templateUrl: './vacancy-detail.html',
  styleUrl: './vacancy-detail.scss',
})
export class VacancyDetail {
  modal = viewChild<ElementRef<HTMLDialogElement>>('dialog')
  private vacanciesService = inject(VacanciesService);
  vacancyId = input.required<string>()
  vacancy: WritableSignal<Vacancy | null> = signal(null);
  updating: boolean = false;
  public readonly VACANCY_TYPES = VACANCY_TYPES;
  public readonly VACANCY_MODALITIES = VACANCY_MODALITIES;

  public vacancyForm = form(signal(EMPTY_VACANCY_FORM), (schemaPath) => {
    required(schemaPath.role, { message: 'Required field' });
    required(schemaPath.type, { message: 'Required field' });
    required(schemaPath.company, { message: 'Required field' });
  })

  viewVacancy() {
    let vacancyDetail = this.vacanciesService.getSingle(this.vacancyId())
    if (vacancyDetail) {
      this.modal()?.nativeElement.showModal()
      this.vacancy.set(vacancyDetail)
      this.vacancyForm().value.set(this.vacancy()!)
    }
  }

  updateVacancy() {

    this.vacanciesService.update(this.vacancyForm().value() as Partial<Vacancy>, this.vacancy()!.id)

    this.vacancy.set(
      {
        title: this.vacancyForm().value().title,
        platform: this.vacancyForm().value().platform,
        skillsMust: this.vacancyForm().value().skillsMust,
        skillsPlus: this.vacancyForm().value().skillsPlus,
        softSkills: this.vacancyForm().value().softSkills,
        recruiters: this.vacancyForm().value().recruiters,
        originalText: this.vacancyForm().value().originalText,
        salaryRange: this.vacancyForm().value().salaryRange,
        role: this.vacancyForm().value().role,
        type: this.vacancyForm().value().type,
        modality: this.vacancyForm().value().modality,
        location: this.vacancyForm().value().location,
        company: this.vacancyForm().value().company,
        id: this.vacancy()!.id,
        date: this.vacancy()!.date,
        status: this.vacancyForm().value().status,
        responses: this.vacancy()!.responses,
        responseIds: this.vacancy()!.responseIds,
        annotations: this.vacancy()!.annotations,
        createdAt: this.vacancy()!.createdAt,
        experienceRange: this.vacancyForm().value().experienceRange
      }
    );
  }
}
