import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import { VacanciesService } from '@app/shared/services/vacancies/vacancy-service';
import { ResponsesService } from '@app/shared/services/responses/responses-service';
import { EMPTY_VACANCY_FORM, EMPTY_RESPONSE_FORM } from '@app/shared/constants';
import { LlmService } from '@app/shared/services/llm/llm-service';
import { Contact, RESPONSE_TYPES, ResponseForm, VACANCY_STATUS } from '@app/shared/types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '@app/shared/services/notifications/notification-service';
import { ContactsService } from '@app/shared/services/contacts/contacts.service';

@Component({
  selector: 'app-response-form',
  imports: [FormField, ReactiveFormsModule],
  templateUrl: './response-form.html',
  styleUrl: './response-form.scss',
})
export class ResponseFormComponent {

  public RESPONSE_TYPES = RESPONSE_TYPES

  private llmService = new LlmService<ResponseForm>;
  private vacanciesService = inject(VacanciesService);
  public responseService = inject(ResponsesService)
  private notificationService = inject(NotificationService)
  private contactsService = inject(ContactsService);

  public vacancies = this.vacanciesService.$listValue;
  private response = signal<ResponseForm>(EMPTY_RESPONSE_FORM)

  public responseForm = form(this.response, (schemaPath) => {
    // required(schemaPath.role, { message: 'Required field' });
  })
  // formTemplate = viewChild<HTMLFormElement>('#responseFormTemplate')
  vacancyFormControl = new FormControl()
  interviewDateFormControl = new FormControl()

  type = `
       export type ResponseForm = {
           people: string; //recruiters name
           id: string;
           offerId: string;
          type: 'REJECTION' | 'INFORMATION_REQUEST' | 'INTERVIEW_SCHEDULE' | 'JOB_PROPOSAL';
           interviewDate?: Date;
           proposalAmount?: number | undefined,
       }`

  updateForm() {
    let message = `
        Return a json object of RESPONSE_TYPE based on the data on JOB_BOARD_MESSAGE. Do not add any extra words; it has to be a json object to be parsed. Your response has to start with '{' and end with '}'.
        RESPONSE_TYPE: ${this.type}
        RECRUITER_MESSAGE: ${this.responseForm().value().originalText}
        `

    this.llmService.callLlmApi(message).then(
      r => {
        r.originalText = this.responseForm().value().originalText
        this.responseForm().value.set(r)
      }
    )
  }

  public submitButtonClicked: boolean = false;

  public submitForm() {


    let company = this.vacanciesService.getSingle(this.vacancyFormControl.value)?.company

    let people = this.responseForm().value().people
    let responseData: ResponseForm = {
      ...this.responseForm().value(),
      interviewDate: this.interviewDateFormControl.value,
      vacancyId: this.vacancyFormControl.value,
      people: this.createContacts(people as string, company!)
    }

    if (!responseData.vacancyId) {
      let newVacancy = this.vacanciesService.create(
        { ...EMPTY_VACANCY_FORM, title: "[auto-generated offer]" }
      );

      if (newVacancy) {
        responseData.vacancyId = newVacancy.id
      } else {
        this.notificationService.createTemporaryNotification('New vacancy asociated to response could not be created.')
      }
    }

    let createdResponse = this.responseService.create(responseData as ResponseForm);
    if (createdResponse) {
      this.updateVacancyStatus(createdResponse.type, createdResponse.vacancyId)
      this.notificationService.createTemporaryNotification('Response created succesfully.')

      this.submitButtonClicked = true;
      this.resetForm()
    } else {
      this.notificationService.createTemporaryNotification('Response could not be created.')
    }
  }

  resetForm() {
    this.responseForm().value.set(EMPTY_RESPONSE_FORM)
    this.responseForm().reset()
    this.interviewDateFormControl.reset();
    this.vacancyFormControl.reset();
    this.submitButtonClicked = false;
  }

  updateVacancyStatus(responsetype: RESPONSE_TYPES, vacancyId: string) {
    switch (responsetype) {
      case RESPONSE_TYPES.INFORMATION_REQUEST:
        this.vacanciesService.update({ status: VACANCY_STATUS.IN_PROCESS }, vacancyId)
        break;
      case RESPONSE_TYPES.INTERVIEW_SCHEDULE:
        this.vacanciesService.update({ status: VACANCY_STATUS.IN_PROCESS }, vacancyId)
        break;
      case RESPONSE_TYPES.JOB_PROPOSAL:
        this.vacanciesService.update({ status: VACANCY_STATUS.RECIPROCATED }, vacancyId)
        break;
      case RESPONSE_TYPES.REJECTION:
        this.vacanciesService.update({ status: VACANCY_STATUS.REJECTED }, vacancyId)
        break;
    }
    this.notificationService.createTemporaryNotification('Vacancy status updated.')

    this.vacanciesService.getList() //refresh state 
  }

  createContacts(people: string, company: string): string {
    if (!people) return '';
    this.notificationService.createTemporaryNotification('Contacts created.')
    return people.split(',').map(
      p => this.contactsService.create({
        name: p,
        company: company,
      })?.id
    ).toString()
  }
}
