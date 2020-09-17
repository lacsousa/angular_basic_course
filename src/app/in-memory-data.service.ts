import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = [
      { id: 1, name: 'Thor'},
      { id: 2, name: 'Hulk'},
      { id: 3, name: 'Homem de Ferro'},
      { id: 4, name: 'Superman'},
      { id: 5, name: 'Batman'},
      { id: 6, name: 'Dr Estranho'},
      { id: 7, name: 'Pantera Negra'},

    ];

    return { heroes };
  }

  genId(heroes: Hero[]): number {
    
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 1;
  }
}
