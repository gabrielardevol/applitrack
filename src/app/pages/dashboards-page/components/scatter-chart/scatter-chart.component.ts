import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-scatter-chart-component',
  imports: [BaseChartDirective],
  templateUrl: './scatter-chart.component.html',
  styleUrl: './scatter-chart.component.scss',
})
export class ScatterChartComponent {
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;

  data = {
    datasets: [{
      label: 'Scatter Dataset',
      data: [{
        x: -10,
        y: 0
      }, {
        x: 0,
        y: 10
      }, {
        x: 10,
        y: 5
      }, {
        x: 0.5,
        y: 5.5
      }],
      backgroundColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Scatter Dataset',
      data: [{
        x: -8,
        y: 0
      }, {
        x: 0,
        y: 8
      }, {
        x: 13,
        y: 15
      }, {
        x: 10.5,
        y: 15.5
      }],
      backgroundColor: 'rgb(157, 255, 104)'
    }],
  };


  labels = input(["Africa", "Asia", "Europe", "Latin America", "North America"])
  type = input<'line' | 'bar' | 'doughnut' | 'pie'>('doughnut')
  constructor() { }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'scatter',
      data: this.data as any,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
