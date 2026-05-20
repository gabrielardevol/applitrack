import { Component, computed, inject } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import { BasicChartComponent } from './components/basic-chart/basic-chart.component';
import { MixedChartComponent } from './components/mixed-chart/mixed-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { MapChartComponent } from './components/map-chart/map-chart.component';
import { DoubleAxisBasicChartComponent } from './components/double-axis-basic-chart/double-axis-basic-chart.component';
import { color } from 'chart.js/helpers';
@Component({
  selector: 'app-dashboards-page',
  imports: [BasicChartComponent, MapChartComponent, MixedChartComponent, ScatterChartComponent, RadarChartComponent, DoubleAxisBasicChartComponent],
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
    let countValues = Object.values(this.dashboardService.vacanciesByWeekDay().count)
    let averageValues = Object.values(this.dashboardService.vacanciesByWeekDay().average)
    let obj = {
      data: [
        {
          data: [...averageValues.splice(1, 6), averageValues[0]],
          label: 'Average',
          backgroundColor: 'grey',
          borderColor: 'grey',
          type: 'line',
          yAxisID: 'y1',

        },
        {
          data: [...countValues.splice(1, 6), countValues[0]],
          label: 'Total',
          backgroundColor: 'black',
          type: 'bar',
          yAxisID: 'y',


        },

      ],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };
    return obj;
  })
  console = console;
}
