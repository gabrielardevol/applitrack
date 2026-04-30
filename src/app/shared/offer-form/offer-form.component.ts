import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { OFFER_MODALITIES, OFFER_ROLES, OFFER_TYPES, OfferForm } from '../types';
import { EMPTY_OFFER_FORM } from '../constants';
import { OffersService } from '../../offers/offers-service';
import { LlmService } from '../services/llm/llm-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'appli-offer-form',
    imports: [FormField, ReactiveFormsModule],
    // providers: [LlmService],
    templateUrl: './offer-form.component.html',
    styleUrl: './offer-form.component.scss',
})
export class OfferFormComponent {

    public readonly OFFER_TYPES = OFFER_TYPES;
    public readonly OFFER_ROLES = OFFER_ROLES;

    public readonly OFFER_MODALITIES = OFFER_MODALITIES;
    private offersService = inject(OffersService);
    private llmService = new LlmService<OfferForm>;

    modalityFormControl = new FormControl()
    roleFormControl = new FormControl()
    typeFormControl = new FormControl()
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
            recruiters: string; //HAS TO BE NAME + SURNAMES. IF MULTIPLE, SEPARATE WITH COMMA
            salaryRange: { 
            min: number | null, //MINIMUM GROSS SALARY PER YEAR
            max: number | null //MAXIMUM GROSS SALARY PER YEAR
            };
                 experienceRange: { 
            min: number | null, //MINIMUM EXPERIENCE IN YEARS
            max: number | null //MAXIMUM EXPERIENCE IN YEARS
            };
            role: 'UNDEFINED' | 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'UX_UI';
            modality: 'UNDEFINED' | 'REMOTE' | 'ON_SITE' | 'HYBRID';
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
                r.modality = r.modality as OFFER_MODALITIES
                r.role = r.role as OFFER_ROLES
                this.offerForm().value.set(r)
                this.roleFormControl.setValue(r.role)
                this.modalityFormControl.setValue(r.modality)
                this.typeFormControl.setValue(r.type || OFFER_TYPES.APPLICATION)
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