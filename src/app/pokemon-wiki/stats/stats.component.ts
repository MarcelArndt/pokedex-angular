import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WikiServiceService } from '../service/wiki-service.service';
import { PokeApiLoaderService } from '../../service/poke-api-loader.service';
@Component({
  selector: 'app-stats',
  imports: [NgxChartsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  constructor(public wiki: WikiServiceService, public api: PokeApiLoaderService) { }
  async ngOnInit() {
    await this.pullEvolutionChain()
  }

  async pullEvolutionChain() {
    const response = await fetch(this.api.pokemonOverviewList$.value[this.wiki.id!].evolution_chain.url);
    const data = await response.json();
    this.distillData(data);
  }


  distillData(data: any) {
    data.chain.evolves_to.forEach((pokemon: any) => {
      console.log(pokemon)
      let name = pokemon.species.name;
      let conditions = [];
      for (const keys in pokemon.evolution_details[0]) {
        let key = keys.toString();
        let condition = '';
        if (pokemon.evolution_details[0][keys] != null) {
          condition = pokemon.evolution_details[0][keys];
          if (pokemon.evolution_details[0][keys].name?.length > 0) {
            condition = pokemon.evolution_details[0][keys].name;
          }
        }

        if (condition) {
          let obj = { name: key, condition: condition }
          conditions.push(obj);
        }
      }
      console.log(name, conditions);
    });
  }

}
