import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero'; // The type
import { HeroService } from '../hero.service';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.getHeroes();
    this.heroService.hookToHeroesCreation( () => setTimeout( () => this.getHeroes(),  100) );
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe( heroes => this.heroes = heroes );
  }

}
