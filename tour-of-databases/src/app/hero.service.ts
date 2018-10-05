import { Injectable } from '@angular/core';
import { Hero } from './Hero';
import { Observable, from } from 'rxjs';
import { DexieServiceService } from './dexie-service.service';
import { MessageService } from './message.service';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroesTable: Dexie.Table<Hero, Number>;

  constructor(
    private messageService: MessageService,
    private dexieService: DexieServiceService
  ) {
    this.heroesTable = this.dexieService.table('heroes');
  }

  hookToHeroesCreation( listener: (primKey, obj, transaction) => any ): void {
    this.heroesTable.hook('creating', listener );
  }

  hookToHeroesUpdate( listener: () => any ): void {
    this.heroesTable.hook('updating', listener );
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: heroes fetched');

    return from( this.heroesTable.toArray() );
  }

  getHero(id: Number): Observable<Hero> {
    this.messageService.add(`HeroService: getHero: got hero with id=${id}`);

    return from( this.heroesTable.get(id) );
  }

  addHero(hero: any) {
    this.messageService.add(`HeroService: addHero: added hero ${hero.name}`);

    return from( this.heroesTable.add(hero) );
  }

  updateHero(hero: Hero) {
    this.messageService.add(`HeroService: updateHero: updated hero ${hero.name}`);

    return from( this.heroesTable.update( hero.id, { name: hero.name } ) );
  }

  deleteHero(id: number) {
    this.messageService.add(`HeroService: deleteHero: deleted hero with id?${id}`);

    return from( this.heroesTable.delete(id) );
  }


}
