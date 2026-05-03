import { Component, inject } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';

@Component({
  selector: 'app-dashboards-page',
  imports: [],
  templateUrl: './dashboards-page.html',
  styleUrl: './dashboards-page.scss',
})
export class DashboardsPage {
  dashboardService = inject(DashboardService)
}
