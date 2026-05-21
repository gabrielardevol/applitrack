import { Component, ElementRef, input, ViewChild, viewChild } from '@angular/core';
import { Chart, } from 'chart.js/auto';
import { Point } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts'
@Component({
  selector: 'app-double-axis-basic-chart-component',
  imports: [BaseChartDirective],
  templateUrl: './double-axis-basic-chart.component.html',
  styleUrl: './double-axis-basic-chart.component.scss',
})
export class DoubleAxisBasicChartComponent {
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;

  data = input<{ data: number[], label: string }[]>([{ data: [2478, 5267, 734, 784, 433], label: 'yass' }, { data: [2478, 5267, 734, 784, 433], label: 'naaaawrl' }])
  labels = input(["Africa", "Asia", "Europe", "Latin America", "North America"])
  type = input<'line' | 'bar'>('bar')
  horizontal = input<boolean>(false)
  constructor() { }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: this.type(),
      data: {
        labels: this.labels(),
        datasets: this.data()
      },
      options: {
        indexAxis: this.horizontal() ? 'y' : 'x',
        scales: {
          x: {
            stacked: true
          },

          y: {
            type: 'linear',
            position: 'left',
            stacked: false,
          },

          y1: {
            type: 'linear',
            position: 'right',
            stacked: false,

            grid: {
              drawOnChartArea: false,
            },
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
