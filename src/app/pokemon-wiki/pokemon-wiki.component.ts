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
  currentNavi?: string = 'overview';
  previousNavi?: string = 'off';

  getNaviClass(naviState: string) {
    let newClass = 'off';
    if (this.currentNavi == naviState && this.previousNavi != this.currentNavi) {
      newClass = 'show';
    }
    if (this.previousNavi == naviState) {
      newClass = 'hidden';
    }
    return newClass;
  }

  switchToNavi(newNavi: string) {
    this.previousNavi = this.currentNavi != newNavi ? this.currentNavi : this.previousNavi;
    this.currentNavi = newNavi;
  }

}
