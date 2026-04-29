import { Component, inject, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { OffersService } from '@app/offers/offers-service';
import { ResponsesService } from '@app/responses/responses-service';
import { EMPTY_RESPONSE_FORM } from '@app/shared/constants';
import { LlmService } from '@app/shared/services/llm/llm-service';
import { RESPONSE_TYPES, ResponseForm } from '@app/shared/types';

@Component({
  selector: 'appli-response-form',
  imports: [FormField,],
  templateUrl: './response-form.html',
  styleUrl: './response-form.scss',
})
export class ResponseFormComponent {
  public RESPONSE_TYPES = RESPONSE_TYPES
  private response = signal<ResponseForm>(EMPTY_RESPONSE_FORM)
  private llmService = new LlmService<ResponseForm>;
  //provide in root and type function?
  private offersService = new OffersService;
  offers = this.offersService.$listValue()
  formTemplate = viewChild<HTMLFormElement>('#responseFormTemplate')

  public responseService = inject(ResponsesService)
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

  public submitButtonClicked: boolean = false;

  public submitForm() {

    //create response
    // --if success, update offer
    // ----if success, all of
    // ----if error, delete response and throw UI alert 
    // --if error, delete response

    this.submitButtonClicked = true;
    if (this.responseForm().valid()) {
      this.responseService.create(this.responseForm().value());
      this.responseForm().value.set(EMPTY_RESPONSE_FORM)
      this.responseForm().reset()
      this.submitButtonClicked = false;
    }
  }
}
