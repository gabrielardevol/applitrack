import { Component, ElementRef, input, ViewChild, viewChild } from '@angular/core';
import { Chart, } from 'chart.js/auto';
import { Point } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts'
@Component({
  selector: 'app-timeline-chart-component',
  imports: [BaseChartDirective],
  templateUrl: './timeline-chart.component.html',
  styleUrl: './timeline-chart.component.scss',
})
export class TimelineChartComponent {
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;

  data1 = {
    datasets: [{
      data: [{
        x: '2021-11-06 23:39:30',
        y: 50
      }, {
        x: '2021-11-07 01:00:28',
        y: 60
      }, {
        x: '2021-11-07 09:00:28',
        y: 20
      }]
    }],
  }
  labels = input(["Africa", "Asia", "Europe", "Latin America", "North America"])
  type = input<'line' | 'bar' | 'doughnut' | 'pie'>('doughnut')
  constructor() { }




  data = {
    labels: [ // Date Objects
      new Date('11/12/2025'),
      new Date('12/12/2025'),
      new Date('13/12/2025'),
      new Date('11/1/2026'),
      new Date('11/2/2025'),
      new Date('11/12/2025'),
      new Date('11/12/2025')
    ],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'red',
      borderColor: 'blue',
      fill: false,
      data: [1, 2, 3, 4, 5, 6, 7],
    }, {
      label: 'My Second dataset',
      backgroundColor: 'red',
      borderColor: 'blue',
      fill: false,
      data: [1, 2, 3, 4, 5, 6, 7],
    },
      // {
      //   label: 'Dataset with point data',
      //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green, 0.5),
      //   borderColor: Utils.CHART_COLORS.green,
      //   fill: false,
      //   data: [{
      //     x: Utils.newDateString(0),
      //     y: Utils.rand(0, 100)
      //   }, {
      //     x: Utils.newDateString(5),
      //     y: Utils.rand(0, 100)
      //   }, {
      //     x: Utils.newDateString(7),
      //     y: Utils.rand(0, 100)
      //   }, {
      //     x: Utils.newDateString(15),
      //     y: Utils.rand(0, 100)
      //   }],
      // }
    ]
  };


  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement,


      {
        type: 'line',
        data: this.data,
        options: {
          plugins: {
            title: {
              text: 'Chart.js Time Scale',
              display: true
            }
          },
          scales: {
            x: {
              type: 'time',
              time: {
                // Luxon format string
                tooltipFormat: 'DD T'
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'value'
              }
            }
          },
        },
      }



    );
  }
}
