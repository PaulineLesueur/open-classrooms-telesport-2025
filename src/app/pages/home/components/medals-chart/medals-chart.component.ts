import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CountryTotals } from 'src/app/core/models/CountryTotals';
import { ChartData } from 'src/app/core/models/ChartData';
import { ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medals-chart',
  templateUrl: './medals-chart.component.html',
  styleUrl: './medals-chart.component.scss'
})
export class MedalsChartComponent implements OnInit {
  data$!: Observable<ChartData>;
  options!: ChartOptions<'pie'>;
  private countries: { id: number, country: string}[] = [];

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe({
      next: () => {},
      error: (err) => console.error('Load data error', err)
    });

    this.data$ = this.olympicService.getCountriesWithTotals().pipe(
     map((countries: CountryTotals[]) => {
        this.countries = countries.map(c => ({ id: c.id, country: c.country }));

        return {
          labels: countries.map(c => c.country),
          datasets: [
            {
              data: countries.map(c => c.medals),
              backgroundColor: ['#956065', '#b8cbe7', '#89a1db', '#793d52', '#9780a1'],
              hoverBackgroundColor: ['#a9777c', '#c7d7ec', '#9bb1e2', '#8f566b', '#a891b3']
            }
          ]
        } as ChartData;
      })
    );

    this.options = {
      plugins: {
        legend: { 
          display: true,
          position: 'bottom',
          onClick: (_event, legendItem, legend) => {
            const index = legendItem.index;
            if (index === undefined) return;

            const country = this.countries[index];
            if (country) {
              this.router.navigate(['/details', country.id]);
            }
          }
        },
        tooltip: {
          displayColors: false,
          backgroundColor: '#04838F',
          bodyColor: '#FFFFFF',
          borderColor: '#04838F',
          padding: { top: 5, bottom: 5, left: 15, right: 15 },
          yAlign: 'bottom',
          titleAlign: 'center',
          titleFont: { size: 16, weight: 400, family: 'Plus Jakarta Sans' },
          bodyFont: { size: 16, weight: 400, family: 'Plus Jakarta Sans' },
          bodyAlign: 'center',
          footerAlign: 'center',
          callbacks: {
            label: (context) => {
              const label = context.label ?? '';
              const value = context.parsed ?? 0;
              return `🏅 ${value}`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: false
      }
    };
  }

  onChartClick(event: any): void {
    console.log('chart click event ->', event);

    const index = event.element?.index;
    if(index === undefined) return;

    const country = this.countries[index];
    if(country) {
      this.router.navigate(['/details', country.id]);
    }
  }
}