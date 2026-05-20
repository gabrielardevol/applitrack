import { Component, computed, inject } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import { BasicChartComponent } from './components/basic-chart/basic-chart.component';
import { MixedChartComponent } from './components/mixed-chart/mixed-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { MapChartComponent } from './components/map-chart/map-chart.component';
import { VacancyDetail } from "@app/vacancies/components/vacancy-detail/vacancy-detail";
@Component({
  selector: 'app-dashboards-page',
  imports: [BasicChartComponent, MapChartComponent, MixedChartComponent, ScatterChartComponent, RadarChartComponent],
  templateUrl: './dashboards-page.html',
  styleUrl: './dashboards-page.scss',
})
export class DashboardsPage {
  dashboardService = inject(DashboardService);
  conversionFunnelData = computed(() => {
    let values: number[] = this.dashboardService.conversionFunnel().map(
      i => i.value || 0
    )
    let labels: string[] = this.dashboardService.conversionFunnel().map(
      i => i.key || ''
    )

    let data: { data: number[], label: string, backgroundColor: string }[] = [{
      data: values,
      label: 'Vacancies',
      backgroundColor: 'black'

    }];

    let object = {
      data: data, labels: labels
    }
    return object;
  }
  )
  VRTimelineData = computed(() => {
    let items = this.dashboardService.vacanciesAndResponsesCountTimeline()
    let obj = {
      data: [
        {
          data: Object.values(items).map(i => (i as any)['vacancies']),
          label: 'vacancies',
          backgroundColor: 'black'
        },
        {
          data: Object.values(items).map(i => (i as any)['responses']),
          label: 'responses',
          backgroundColor: `grey`
        },
      ],
      labels: Object.keys(items)
    };
    return obj;
  }
  )
  weekDaysVccDistribution = computed(() => {
    let distribution = Object.values(this.dashboardService.vacanciesByWeekDay())
    let obj = {
      data: [
        {
          data: [...distribution.splice(1, 6), distribution[0]],
          label: 'Vacancies',
          backgroundColor: 'black'
        },
      ],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };
    return obj;
  })
  console = console;
}
