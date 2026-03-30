import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ResponseFormComponent } from '../response-form/response-form.component';
import { OfferFormComponent } from '../offer-form/offer-form.component';

@Component({
  selector: 'app-base-page',
  imports: [RouterOutlet, RouterLink, OfferFormComponent, ResponseFormComponent],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss',
})
export class BasePageComponent { }
