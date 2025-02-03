import { Component } from '@angular/core';
import { LoreComponent } from './lore/lore.component';
import { WikiServiceService } from './service/wiki-service.service';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';

@Component({
  selector: 'app-pokemon-wiki',
  imports: [LoreComponent, CommonModule, StatsComponent],
  templateUrl: './pokemon-wiki.component.html',
  styleUrl: './pokemon-wiki.component.scss'
})
export class PokemonWikiComponent {
  constructor(public wiki: WikiServiceService) { }
}
