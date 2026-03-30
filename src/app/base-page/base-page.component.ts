import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OfferFormComponent } from "../offers/components/offer-form/offer-form.component";
import { ResponseFormComponent } from "../offers/components/response-form/response-form.component";

@Component({
  selector: 'app-base-page',
  imports: [RouterOutlet, RouterLink, OfferFormComponent, ResponseFormComponent],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss',
})
export class BasePageComponent { }
