import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {

  @Input('Labels') doughnutChartLabels: Label[] = [];
  @Input('Data') doughnutChartData: MultiDataSet = [];
  @Input('Type') doughnutChartType: ChartType = 'doughnut';
  @Input('Leyenda') leyenda: string = 'Sin Titulo';
  constructor() { }

  ngOnInit() {
  }

}
