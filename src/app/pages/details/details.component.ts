import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CommonModule } from '@angular/common';
import { MedalsLineChartComponent } from "src/app/core/components/medals-line-chart/medals-line-chart.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailComponent implements OnInit {
 country$!: Observable<{ id: number, country: string, entries: number, medals: number, athletes: number } | undefined>;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  /**
   * OnInit lifecycle method:
   * - Retrieves the 'id' parameter from the current route.
   * - Uses the OlympicService to get the list of countries with their totals.
   * - Finds and exposes the country matching the given ID as an observable.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 

    this.country$ = this.olympicService.getCountriesWithTotals().pipe(
      map(countries => countries.find(c => c.id === id))
    );
  }
}
