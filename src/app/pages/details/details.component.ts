import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailComponent implements OnInit {
 country$!: Observable<{ id: number, country: string, entries: number, medals: number, athletes: number } | undefined>;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 

    this.country$ = this.olympicService.getCountriesWithTotals().pipe(
      map(countries => countries.find(c => c.id === id))
    );
  }
}
