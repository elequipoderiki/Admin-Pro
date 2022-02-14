import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {
  
  // Doughnut
  @Input('chartData') doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };

  @Input() chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
