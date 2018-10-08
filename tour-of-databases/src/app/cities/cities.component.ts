import { Component, OnInit } from '@angular/core';
import { City } from '../City';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  heroes: Hero[];
  heroes$: Observable<Hero[]>;
  heroName: String;

  cities: City[];
  cityToAdd: String;
  heroToAdd: Number;

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);
    console.log(term, this.heroes$);
  }

  ngOnInit() {
    this.getHeroes();
    this.getCities();
    this.heroService.hookToCitiesCreation( () => setTimeout( () => this.getCities(),  100) );

    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  getCities() {
    this.heroService.getCities().subscribe(
      cities => this.cities = cities.map(
          c =>
            ({
              ...c,
              name: (this.heroes.find( h => h.id === c.hero ) ? this.heroes.find( h => h.id === c.hero ).name : c.hero)
            })
        )
    );
  }

  addCity() {
    const toAdd: City = { hero: this.heroToAdd, city: this.cityToAdd };
    this.heroService.addCity(toAdd);
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe( heroes => this.heroes = heroes );
  }


  setHeroToAdd(id: Number, name: String) {
    this.heroToAdd = id;
    this.heroName = name;
  }

}
