import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { OFFER_MODALITIES, OFFER_TYPES, OfferForm } from '../types';
import { EMPTY_OFFER_FORM } from '../constants';
import { OffersService } from '../../offers/offers-service';
import { LlmService } from '../services/llm/llm-service';

@Component({
    selector: 'appli-offer-form',
    imports: [FormField],
    // providers: [LlmService],
    templateUrl: './offer-form.component.html',
    styleUrl: './offer-form.component.scss',
})
export class OfferFormComponent {

    public readonly OFFER_TYPES = OFFER_TYPES;
    public readonly OFFER_MODALITIES = OFFER_MODALITIES;
    private offersService = inject(OffersService);
    private llmService = new LlmService;

    private offer = signal<OfferForm>(EMPTY_OFFER_FORM)

    public offerForm = form(this.offer, (schemaPath) => {
        required(schemaPath.role, { message: 'Required field' });
        required(schemaPath.type, { message: 'Required field' });
        required(schemaPath.company, { message: 'Required field' });
    })

    public submitButtonClicked: boolean = false;

    public submitForm() {

        this.llmService.callLlmApi().then(
            r => console.log(r)
        )

        this.submitButtonClicked = true;
        if (this.offerForm().valid()) {
            this.offersService.create(this.offerForm().value());
            this.offerForm().value.set(EMPTY_OFFER_FORM)
            this.offerForm().reset()
            this.submitButtonClicked = false;
        }
    }
}