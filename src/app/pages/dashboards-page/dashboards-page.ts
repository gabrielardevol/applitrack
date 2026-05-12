import { Component, computed, inject } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import { BasicChartComponent } from './components/basic-chart/basic-chart.component';
import { MixedChartComponent } from './components/mixed-chart/mixed-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
@Component({
  selector: 'app-dashboards-page',
  imports: [BasicChartComponent, MixedChartComponent, ScatterChartComponent, RadarChartComponent,],
  templateUrl: './dashboards-page.html',
  styleUrl: './dashboards-page.scss',
})
export class DashboardsPage {
  dashboardService = inject(DashboardService);

  VRTimelineData = computed(() => {
    let items = this.dashboardService.vacanciesAndResponsesCountTimeline()
    let obj = {
      data: [
        {
          data: Object.values(items).map(i => (i as any)['vacancies']),
          label: 'vacancies',
          backgroundColor: 'red'
        },
        {
          data: Object.values(items).map(i => (i as any)['responses']),
          label: 'responses',
          backgroundColor: `blue`
        },
      ],
      labels: Object.keys(items)
    };
    return obj;
  }
  )
  console = console;
}
