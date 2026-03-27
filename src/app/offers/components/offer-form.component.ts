import { Component, inject, signal } from '@angular/core';
import { OffersService } from '../../services/offers-service';
import { Offer, OFFER_MODALITIES, OFFER_TYPES, OfferForm } from '../../core/types';
@Component({
    selector: 'at-offer-form',
    imports: [],
    templateUrl: './offer-form.component.html',
    styleUrl: './offer-form.component.scss',
})
export class OfferFormComponent {

    private readonly mode: 'create' | 'update' = 'create';

    offersService = inject(OffersService);

    offer = signal<OfferForm>({
        platform: '',
        date: new Date,
        skillsMust: [],
        skillsPlus: [],
        softSkills: [],
        recruiters: [],
        originalText: '',
        salaryRange: {
            min: 0, max: 0
        },
        role: '',
        type: OFFER_TYPES.APPLICATION,
        status: '',
        annotations: [],
        modality: OFFER_MODALITIES.ON_SITE,
        location: ''

    })

    public submitForm() {
        this.offersService.create({} as Offer)
    }
}