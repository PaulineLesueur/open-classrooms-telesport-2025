import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public numberOfOlympics$! : Observable<number>;
  public numberOfCountries$! : Observable<number>;

  constructor(private olympicService: OlympicService) {}

  /**
   * OnInit lifecycle method:
   * - Initializes data streams by connecting component observables 
   *   to the corresponding OlympicService observables.
   * - Provides all necessary data for the home view: 
   *   number of games, number of countries
   */
  ngOnInit(): void {
    this.numberOfOlympics$ = this.olympicService.getNumberOfOlympics();
    this.numberOfCountries$ = this.olympicService.getNumberOfCountries();
  }
}

  
