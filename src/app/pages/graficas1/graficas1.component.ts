import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [
  ]
})
export class Graficas1Component implements OnInit {

  
  graficos: any = {
    'grafico1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'El pan se come con'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': '¿Le dan gases los frijoles?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': '¿Le importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

  getDataFromGraficos(index: number){
    return {
      labels: this.graficos['grafico'+index].labels,
      datasets: [{ data: this.graficos['grafico'+index].data }],
    };
  }
}



// import { Component, OnInit } from '@angular/core';
// import { ChartData, ChartType } from 'chart.js';

// @Component({
//   selector: 'app-doughnut-chart',
//   templateUrl: './doughnut-chart.component.html',
//   styleUrls: [ './doughnut-chart.component.scss' ]
// })
// export class DoughnutChartComponent {
//   // Doughnut
//   public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
//   public doughnutChartData: ChartData<'doughnut'> = {
//     labels: this.doughnutChartLabels,
//     datasets: [
//       { data: [ 350, 450, 100 ] },
//       { data: [ 50, 150, 120 ] },
//       { data: [ 250, 130, 70 ] }
//     ]
//   };
//   public doughnutChartType: ChartType = 'doughnut';

 