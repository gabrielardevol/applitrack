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

  // data = [2478, 5267, 734, 784, 433]
  // labels = ["Africa", "Asia", "Europe", "Latin America", "North America"]
  // type: 'line' | 'bar' | 'doughnut' = 'doughnut'
  data = input([2478, 5267, 734, 784, 433])
  labels = input(["Africa", "Asia", "Europe", "Latin America", "North America"])
  type = input<'line' | 'bar' | 'doughnut' | 'pie'>('doughnut')
  constructor() { }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: this.type(),
      data: {
        labels: this.labels(),
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: this.data()
          }
        ]
      },
      options: {
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
