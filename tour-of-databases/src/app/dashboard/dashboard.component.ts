import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';
import { City } from '../City';
import { HeroService } from '../hero.service';


interface HeroCount extends Hero {
  saved: Number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topHeroes: HeroCount[] = [];
  cities: City[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getCities();
    this.getHeroes();
  }

  getHeroes () {
    this.heroService.getHeroes().subscribe(
      heroes =>
      this.topHeroes = heroes.map(
        h => ({
          ...h,
          saved: this.cities.filter( c => c.hero === h.id ).length,
        }))
        .sort( (a, b) => (a.saved > b.saved ? -1 : b.saved > a.saved ? 1 : 0 ) )
        // .map( pair => pair.who )
        .slice(0, Math.min(heroes.length, 3))
    );
  }

  getCities() {
    this.heroService.getCities().subscribe( cit => this.cities = cit );
  }

}
