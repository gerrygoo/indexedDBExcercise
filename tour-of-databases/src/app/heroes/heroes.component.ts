import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero'; // The type
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService ) { }

  ngOnInit() {
    this.getHeroes();
    this.heroService.hookToHeroesCreation( () => setTimeout( () => this.getHeroes(),  100) );
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe( heroes => this.heroes = heroes );
  }

}
