import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { map, Observable, switchMap } from 'rxjs';
import { OlympicService } from '../../services/olympic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medals-line-chart',
  templateUrl: './medals-line-chart.component.html',
  styleUrl: './medals-line-chart.component.scss'
})
export class MedalsLineChartComponent implements OnInit {
  data$!: Observable<ChartData>;
  options!: ChartOptions<'line'>;
  countryName!: string;
  lineColor = '#04838F'; 

  private colors = ['#956065', '#b8cbe7', '#89a1db', '#793d52', '#9780a1']; 

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const countryId$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id')))
    );

    this.data$ = countryId$.pipe(
      switchMap(id => this.olympicService.getCountryParticipations(id).pipe(
        map(participations => {
          if (!participations) return { labels: [], datasets: [] } as ChartData;

          participations.sort((a, b) => a.year - b.year);

          this.olympicService.getOlympics().subscribe(olympics => {
            const country = olympics?.find(c => c.id === id);
            this.countryName = country?.country ?? '';
          });

          const index = id - 1; 
          this.lineColor = this.colors[index % this.colors.length];

          return {
            labels: participations.map(p => p.year.toString()),
            datasets: [
              {
                data: participations.map(p => p.medalsCount),
                borderColor: this.lineColor,
                borderWidth: 2,
                pointRadius: 2, 
                backgroundColor: [this.lineColor],
                hoverBackgroundColor: [this.lineColor]
              }
            ]
          } as ChartData;
        })
      ))
    );

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
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
          caretSize: 0,
          callbacks: {
            label: (context) => `🏅 ${context.parsed.y}`,
            title: () => ''
          }
         }
      },
      scales: {
        x: { title: { display: true, text: 'Dates' } },
        y: { title: { display: true, text: 'Médailles' }, beginAtZero: true }
      }
    };
  }
}