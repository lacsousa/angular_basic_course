import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Hero } from './hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`;

  private httpOptions =  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes) => this.log(`fetched ${heroes.length} heroes`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }


  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>('getHero'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  addHero( hero: Hero): Observable<Hero> {
    return this.http.post<Hero>( this.heroesUrl, hero, this.httpOptions).pipe(
      tap( (newHero) => this.log(`added Hero id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero: Hero): Observable<Hero>  {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put<Hero>(url, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('updateHero'))
    );
  }

  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap( () => this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`, this.httpOptions)
      .pipe(
        tap((heroes) =>
          heroes && heroes.length
            ? this.log(`found ${heroes.length} heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
