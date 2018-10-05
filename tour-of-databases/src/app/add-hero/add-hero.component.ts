import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {
  @Input() name: string;

  constructor(private heroService: HeroService) {}

  ngOnInit() {}

  addHero() {
    this.heroService.addHero({ name: this.name });
  }

}
