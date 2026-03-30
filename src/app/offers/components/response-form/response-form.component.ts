import { Component, inject, signal } from '@angular/core';
import { OffersService } from '../../../services/offers-service';
import { OFFER_MODALITIES, OFFER_TYPES, OfferForm, OfferListItem, RESPONSE_TYPES, ResponseForm } from '../../../core/types';
import { form, FormField, required } from '@angular/forms/signals';
import { EMPTY_OFFER_FORM, EMPTY_RESPONSE_FORM } from '../../../core/constants';
import { ResponsesService } from '../../../services/responses-service';
import { Form, FormControl, FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'appli-response-form',
    imports: [FormField, ReactiveFormsModule],
    templateUrl: './response-form.component.html',
    styleUrl: './response-form.component.scss',
})
export class ResponseFormComponent {

    private responsesService = inject(ResponsesService);
    private offersService = inject(OffersService);

    public readonly offersList: OfferListItem[] = [];

    private response = signal<ResponseForm>(EMPTY_RESPONSE_FORM);

    public companyControl: FormControl = new FormControl('');

    public readonly RESPONSE_TYPES = RESPONSE_TYPES;

    constructor() {
        this.offersList = this.offersService.$listValue()
    }

    public responseForm = form(this.response, (schemaPath) => {
        required(schemaPath.offerId, { message: 'Required field' });
    })

    public submitButtonClicked: boolean = false;

    public submitForm() {
        this.submitButtonClicked = true;
        if (this.responseForm().valid()) {
            this.createResponseAndUpdateOffer()
            this.responseForm().value.set(EMPTY_RESPONSE_FORM);
            this.responseForm().reset();
            this.submitButtonClicked = false;
        }
    }

    public createResponseAndUpdateOffer() {
        let createdResponse = this.responsesService.create(this.responseForm().value());
        if (!createdResponse) return;

        this.offersService.addResponse(createdResponse.id, createdResponse.offerId)

    }
}