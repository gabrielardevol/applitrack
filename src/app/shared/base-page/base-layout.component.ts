import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { ResponseFormComponent } from '@app/response-form/response-form';
import { AlertsComponent } from './alerts/alerts.component';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, RouterLink, OfferFormComponent, ResponseFormComponent, AlertsComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent { }
