import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VacancyFormComponent } from '@app/vacancies/vacancy-form/vacancy-form.component';
import { ResponseFormComponent } from '@app/responses/response-form/response-form';
import { AlertsComponent } from "./alerts/alerts.component";
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, RouterLink, ResponseFormComponent, NotificationsComponent, VacancyFormComponent, AlertsComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent { }
