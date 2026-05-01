import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VacancyFormComponent } from '@app/vacancies/vacancy-form/vacancy-form.component';
import { ResponseFormComponent } from '@app/responses/response-form/response-form';
import { AlertsComponent } from '@shared/base-page/alerts/alerts.component';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, RouterLink, ResponseFormComponent, AlertsComponent, VacancyFormComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent { }
