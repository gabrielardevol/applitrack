import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ResponseFormComponent } from '@app/responses/response-form/response-form';
import { AlertsComponent } from "./alerts/alerts.component";
import { NotificationsComponent } from './notifications/notifications.component';
import { VacancyFormComponent } from '@app/vacancies/components/vacancy-form/vacancy-form.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, RouterLink, ResponseFormComponent, NotificationsComponent, VacancyFormComponent, AlertsComponent, NgClass],
  templateUrl: './base-layout.component.html',
  providers: [],
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {
  route = inject(ActivatedRoute);
  router = inject(Router)
}
