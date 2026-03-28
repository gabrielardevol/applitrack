import { Component, inject, signal } from '@angular/core';
import { OffersService } from '../../../services/offers-service';
import { OFFER_MODALITIES, OFFER_TYPES, OfferForm } from '../../../core/types';
import { form, FormField, required } from '@angular/forms/signals';
import { EMPTY_OFFER_FORM } from '../../offers.constants';

@Component({
    selector: 'appli-offer-form',
    imports: [FormField],
    templateUrl: './offer-form.component.html',
    styleUrl: './offer-form.component.scss',
})
export class OfferFormComponent {

    private readonly mode: 'create' | 'update' = 'create';
    public readonly OFFER_TYPES = OFFER_TYPES;
    public readonly OFFER_MODALITIES = OFFER_MODALITIES;
    private offersService = inject(OffersService);
    private offer = signal<OfferForm>(EMPTY_OFFER_FORM)

    public offerForm = form(this.offer, (schemaPath) => {
        required(schemaPath.role, { message: 'Required field' });
        required(schemaPath.type, { message: 'Required field' });
        required(schemaPath.company, { message: 'Required field' });
    })

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