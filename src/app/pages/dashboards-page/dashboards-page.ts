import { Component, inject } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import { BasicChartComponent } from './components/basic-chart/basic-chart.component';
import { MixedChartComponent } from './components/mixed-chart/mixed-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { TimelineChartComponent } from './components/timeline-chart/timeline-chart.component';
@Component({
  selector: 'app-dashboards-page',
  imports: [BasicChartComponent, MixedChartComponent, ScatterChartComponent, RadarChartComponent, TimelineChartComponent],
  templateUrl: './dashboards-page.html',
  styleUrl: './dashboards-page.scss',
})
export class DashboardsPage {
  dashboardService = inject(DashboardService)
}
