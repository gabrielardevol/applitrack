import { Component, ElementRef, input, ViewChild, viewChild } from '@angular/core';
import { Chart, } from 'chart.js/auto';
import { Point } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts'
@Component({
  selector: 'app-basic-chart-component',
  imports: [BaseChartDirective],
  templateUrl: './basic-chart.component.html',
  styleUrl: './basic-chart.component.scss',
})
export class BasicChartComponent {
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;

  data = input<{ data: number[], label: string }[]>([{ data: [2478, 5267, 734, 784, 433], label: 'yass' }, { data: [2478, 5267, 734, 784, 433], label: 'naaaawrl' }])
  labels = input(["Africa", "Asia", "Europe", "Latin America", "North America"])
  type = input<'line' | 'bar' | 'doughnut' | 'pie'>('doughnut')
  constructor() { }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: this.type(),
      data: {
        labels: this.labels(),
        datasets: this.data()
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: false,
            text: 'Predicted world population (millions) in 2050'
          }
        },

      }
    });
  }
}
