import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { OffersService } from '@app/offers/offers-service';
import { EMPTY_RESPONSE_FORM } from '@app/shared/constants';
import { LlmService } from '@app/shared/services/llm/llm-service';
import { RESPONSE_TYPES, ResponseForm } from '@app/shared/types';

@Component({
  selector: 'appli-response-form',
  imports: [FormField, ReactiveFormsModule],
  templateUrl: './response-form.html',
  styleUrl: './response-form.scss',
})
export class ResponseFormComponent {
  public RESPONSE_TYPES = RESPONSE_TYPES
  private response = signal<ResponseForm>(EMPTY_RESPONSE_FORM)
  private llmService = new LlmService<ResponseForm>;
  private offersService = new OffersService;

  offers = this.offersService.$listValue()

  formDate = new FormControl()
  formTime = new FormControl()
  //¨provide in root and type function?

  public responseForm = form(this.response, (schemaPath) => {
    // required(schemaPath.role, { message: 'Required field' });
  })

  type = `
       export type ResponseForm = {
           people: string; //recruiters name
           id: string;
           offerId: string;
           type: RESPONSE_TYPES;
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
}
