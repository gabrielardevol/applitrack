import { Component, effect, inject, signal } from '@angular/core';
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
    private llmService = new LlmService<OfferForm>;


    private offer = signal<OfferForm>(EMPTY_OFFER_FORM)

    public offerForm = form(this.offer, (schemaPath) => {
        required(schemaPath.role, { message: 'Required field' });
        required(schemaPath.type, { message: 'Required field' });
        required(schemaPath.company, { message: 'Required field' });
    })

    type = `
        export type OfferForm = {
            platform: string;
            skillsMust: string;
            skillsPlus: string;
            softSkills: string;
            recruiters: string;
            originalText: string;
            salaryRange: { min: number | null, max: number | null };
            role: string;
            type: OFFER_TYPES;
            modality: OFFER_MODALITIES;
            location: string;
            company: string;
            id: string;
            date: Date | null;
            status: string;
        };`


    updateForm() {
        let message = `
        Return a json object of OFFER_TYPE based on the data on JOB_BOARD_MESSAGE. Do not add any extra words; it has to be a json object to be parsed. Your response has to start with '{' and end with '}'.
        OFFER_TYPE: ${this.type}
        JOB_BOARD_MESSAGE: ${this.offerForm().value().originalText}
        `

        this.llmService.callLlmApi(message).then(
            r => {
                r.originalText = this.offerForm().value().originalText
                this.offerForm().value.set(r)
            }
        )
    }


    public submitButtonClicked: boolean = false;

    public submitForm() {



        this.submitButtonClicked = true;
        if (this.offerForm().valid()) {
            this.offersService.create(this.offerForm().value());
            this.offerForm().value.set(EMPTY_OFFER_FORM)
            this.offerForm().reset()
            this.submitButtonClicked = false;
        }
    }
}