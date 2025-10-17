import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]| null | undefined>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[] | null> {
  return this.http.get<Olympic[]>(this.olympicUrl).pipe(
    tap((value) => this.olympics$.next(value)), 
    catchError((error) => {
      console.error('Erreur lors du chargement des données olympiques', error);
      this.olympics$.next(null); 
      return of(null); 
    })
  );
}

  getOlympics(): Observable<Olympic[] | null | undefined> {
    return this.olympics$.asObservable();
  }

  getNumberOfOlympics(): Observable<number> {
    return this.getOlympics().pipe(
      map(olympics => {
        if (!olympics) return 0;
        const years = olympics.flatMap(c => c.participations.map(p => p.year));
        return new Set(years).size;
      })
    );
  }

  getNumberOfCountries(): Observable<number> {
    return this.getOlympics().pipe(
      map(olympics => olympics?.length ?? 0)
    );
  }

  getCountriesWithTotals(): Observable<{ id: number, country: string, entries: number, medals: number, athletes: number }[]> {
    return this.getOlympics().pipe(
      map(olympics => {
        if (!olympics) return [];
        return olympics.map(o => ({
          id: o.id,
          country: o.country,
          entries: o.participations.length,
          medals: o.participations.reduce((sum, p) => sum + p.medalsCount, 0),
          athletes: o.participations.reduce((sum, p) => sum + p.athleteCount, 0)
        }));
      })
    );
  }

  getCountryParticipations(countryId: number): Observable<Participation[] | null> {
    return this.getOlympics().pipe(
      map(olympics => {
        const country = olympics?.find(o => o.id === countryId);
        return country ? country.participations : null;
      })
    );
  }
}
