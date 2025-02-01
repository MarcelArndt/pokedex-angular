import { Component, Input } from '@angular/core';
import { PokeApiLoaderService } from '../../service/poke-api-loader.service';
import { WikiServiceService } from '../service/wiki-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-lore',
  imports: [CommonModule],
  templateUrl: './lore.component.html',
  styleUrl: './lore.component.scss'
})
export class LoreComponent {
  constructor(public api: PokeApiLoaderService, public wiki: WikiServiceService) { }

  get lore() {
    console.log(this.api.pokemonOverviewList$.value[0]);
    return 'hello'
  }

  get germanLore() {
    let loreTextArray = this.api.pokemonOverviewList$.value[this.wiki.id!].flavor_text_entries;
    let germanText: string[] = []
    loreTextArray.forEach((obj: any) => {
      if (obj.language.name == 'de') {
        germanText.push(obj.flavor_text)
      }
    });
    return germanText;
  }

}
