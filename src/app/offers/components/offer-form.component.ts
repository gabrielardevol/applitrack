import { Component, inject, signal } from '@angular/core';
import { OffersService } from '../../services/offers-service';
import { Offer, OFFER_MODALITIES, OFFER_TYPES, OfferForm } from '../../core/types';
import { debounce, email, form, FormField, required } from '@angular/forms/signals';
import { EMPTY_OFFER_FORM } from '../offers.constants';

@Component({
    selector: 'at-offer-form',
    imports: [FormField],
    templateUrl: './offer-form.component.html',
    styleUrl: './offer-form.component.scss',
})
export class OfferFormComponent {

    private readonly mode: 'create' | 'update' = 'create';
    OFFER_TYPES = OFFER_TYPES;
    OFFER_MODALITIES = OFFER_MODALITIES;

    offersService = inject(OffersService);

    offer = signal<OfferForm>(EMPTY_OFFER_FORM)

    offerForm = form(this.offer, (schemaPath) => {
        required(schemaPath.role, { message: 'Required field' });
        required(schemaPath.type, { message: 'Required field' });
        required(schemaPath.company, { message: 'Required field' });
    })

    submitButtonClicked: boolean = false;
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