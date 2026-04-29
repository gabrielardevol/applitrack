import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { ResponseFormComponent } from '@app/response-form/response-form';

@Component({
  selector: 'app-base-page',
  imports: [RouterOutlet, RouterLink, OfferFormComponent, ResponseFormComponent],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss',
})
export class BasePageComponent { }
