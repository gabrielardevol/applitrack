import { Component, inject, signal, viewChild } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { VacanciesService } from '@app/vacancies/vacancy-service';
import { ResponsesService } from '@app/responses/responses-service';
import { EMPTY_VACANCY_FORM, EMPTY_RESPONSE_FORM } from '@app/shared/constants';
import { LlmService } from '@app/shared/services/llm/llm-service';
import { RESPONSE_TYPES, ResponseForm } from '@app/shared/types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-response-form',
  imports: [FormField, ReactiveFormsModule],
  templateUrl: './response-form.html',
  styleUrl: './response-form.scss',
})
export class ResponseFormComponent {
  public RESPONSE_TYPES = RESPONSE_TYPES
  private response = signal<ResponseForm>(EMPTY_RESPONSE_FORM)
  private llmService = new LlmService<ResponseForm>;
  private vacanciesService = new VacanciesService;
  vacancies = this.vacanciesService.$listValue()
  formTemplate = viewChild<HTMLFormElement>('#responseFormTemplate')

  interviewDateFormControl = new FormControl()
  public responseService = inject(ResponsesService)
  public responseForm = form(this.response, (schemaPath) => {
    // required(schemaPath.role, { message: 'Required field' });
  })

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

    if (!this.responseForm().value().vacancyId) {
      let newVacancy = this.vacanciesService.create(
        { ...EMPTY_VACANCY_FORM, title: "[auto-generated offer]" }
      );
      if (newVacancy) {
        this.responseForm().value().vacancyId = newVacancy.id
      } else {
        //throw error and stop
      }
    }
    if (this.responseForm().valid()) {

      let responseData = {
        ...this.responseForm().value(),
        interviewDate: this.interviewDateFormControl.value
      }
      console.log('responseData', responseData)
      let createdResponse = this.responseService.create(responseData);

      this.submitButtonClicked = true;
      if (!createdResponse) {
        // handle error
      } else {
        this.resetForm()
      }
    }
  }

  resetForm() {
    this.responseForm().value.set(EMPTY_RESPONSE_FORM)
    this.responseForm().reset()
    this.submitButtonClicked = false;
  }
}
