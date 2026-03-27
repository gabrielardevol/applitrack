import { Component, inject } from '@angular/core';
import { OffersService } from '../../services/offers-service';
import { Offer } from '../../core/types';
@Component({
    selector: 'at-offer-form',
    imports: [],
    templateUrl: './offer-form.component.html',
    styleUrl: './offer-form.component.scss',
})
export class OfferFormComponent {

    private readonly mode: 'create' | 'update' = 'create';

    offersService = inject(OffersService);

    public submitForm() {
        this.offersService.create({} as Offer)
    }
}