import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
  selector: 'app-medals-chart',
  templateUrl: './medals-chart.component.html',
  styleUrl: './medals-chart.component.scss'
})
export class MedalsChartComponent {
  chartData$: Observable<{ name: string, value: number }[]>;

  tooltipText = (model: { name: string, value: number }) => {
    return `${model.name}\n🏅 ${model.value}`; 
  }
  constructor(olympicService: OlympicService) {
    this.chartData$ = olympicService.getCountriesChartData();
  }
}
