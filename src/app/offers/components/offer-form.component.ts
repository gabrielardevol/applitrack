import { Component, inject, signal } from '@angular/core';
import { OffersService } from '../../services/offers-service';
import { Offer, OFFER_MODALITIES, OFFER_TYPES, OfferForm } from '../../core/types';
import { form, FormField } from '@angular/forms/signals';

const EMPTY_OFFER_FORM: OfferForm = {
    platform: '',
    skillsMust: '',
    skillsPlus: '',
    softSkills: '',
    recruiters: '',
    originalText: '',
    salaryRange: {
        min: null, max: null
    },
    role: '',
    type: OFFER_TYPES.APPLICATION,
    modality: OFFER_MODALITIES.HYBRID,
    location: ''
}

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

    offerForm = form(this.offer)

    public submitForm() {
        this.offersService.create(this.offerForm().value())
    }
}