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
  // URL pointing to the mock JSON file containing Olympic data
  private olympicUrl = './assets/mock/olympic.json';

  /**
   * BehaviorSubject is used to store and share the current list of Olympic data.
   * It starts as 'undefined' (data not yet loaded), 
   * then becomes an array of Olympics or 'null' if loading fails.
   */
  private olympics$ = new BehaviorSubject<Olympic[] | null | undefined>(undefined);

  constructor(private http: HttpClient) {}

  /**
   * Loads the initial Olympic data from the JSON file.
   * - Makes an HTTP GET request to fetch the data.
   * - If successful, the data is stored in the BehaviorSubject.
   * - If an error occurs, logs it, updates the subject with null, and returns an observable of null.
   *
   * @returns Observable of Olympic array or null
   */
  loadInitialData(): Observable<Olympic[] | null> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)), // Pushes the loaded data into the BehaviorSubject
      catchError((error) => {
        console.error('Error loading Olympic data', error);
        this.olympics$.next(null); // Updates with null to indicate failure
        return of(null); // Returns a safe observable to prevent app crash
      })
    );
  }

  /**
   * Returns an observable of the current Olympic data stream.
   * Components can subscribe to this to get the latest data or updates.
   *
   * @returns Observable of Olympic array, null, or undefined
   */
  getOlympics(): Observable<Olympic[] | null | undefined> {
    return this.olympics$.asObservable();
  }

  /**
   * Calculates the number of unique Olympic Games (based on year) across all countries.
   * - Extracts all participation years.
   * - Uses a Set to remove duplicates.
   *
   * @returns Observable<number> representing the count of distinct Olympic years
   */
  getNumberOfOlympics(): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics) => {
        if (!olympics) return 0;
        const years = olympics.flatMap((c) => c.participations.map((p) => p.year));
        return new Set(years).size;
      })
    );
  }

  /**
   * Returns the number of countries that participated in the Olympics dataset.
   * - Simply counts the number of Olympic entries (one per country).
   *
   * @returns Observable<number> number of countries
   */
  getNumberOfCountries(): Observable<number> {
    return this.getOlympics().pipe(map((olympics) => olympics?.length ?? 0));
  }

  /**
   * Computes summary statistics for each country:
   * - Total number of participations (entries)
   * - Total medals won
   * - Total athletes participated
   *
   * @returns Observable of an array containing country summaries
   */
  getCountriesWithTotals(): Observable<
    { id: number; country: string; entries: number; medals: number; athletes: number }[]
  > {
    return this.getOlympics().pipe(
      map((olympics) => {
        if (!olympics) return [];
        return olympics.map((o) => ({
          id: o.id,
          country: o.country,
          entries: o.participations.length,
          medals: o.participations.reduce((sum, p) => sum + p.medalsCount, 0),
          athletes: o.participations.reduce((sum, p) => sum + p.athleteCount, 0),
        }));
      })
    );
  }

  /**
   * Retrieves all participations for a specific country, identified by its ID.
   * - Searches the dataset for the matching country.
   * - Returns that country's participation array, or null if not found.
   *
   * @param countryId - unique identifier of the country
   * @returns Observable<Participation[] | null>
   */
  getCountryParticipations(countryId: number): Observable<Participation[] | null> {
    return this.getOlympics().pipe(
      map((olympics) => {
        const country = olympics?.find((o) => o.id === countryId);
        return country ? country.participations : null;
      })
    );
  }
}