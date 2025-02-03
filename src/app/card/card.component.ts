import { Component, Input } from '@angular/core';
import { PokeApiLoaderService } from '../service/poke-api-loader.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-card',
  imports: [CommonModule, IconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(public api: PokeApiLoaderService) { }
  @Input() id: number = 0;
  pokemonDetails: any = {}
  idString?: string;
  types?: string[];
  firstColor?: string;
  secondColor?: string;

  async ngOnInit() {
    this.api.pokemonOverviewList$.subscribe(data => {
      this.pokemonDetails = data;
    });
    await this.pickColorByType();
    await this.renderIdString();
  }

  async renderIdString() {
    let pokeId = this.id + 1;
    let string = pokeId.toString();
    for (let i = string.length; i < 3; i++) {
      string = '0' + string;
    }
    this.pokemonDetails[this.id].idString = string;
  }

  async pickColorByType() {
    switch (await this.pokemonDetails[this.id].types[0].type.name) {
      case 'grass': this.firstColor = '#86e1c3', this.secondColor = '#1ab581'; break;
      case 'fire': this.firstColor = '#EAC097', this.secondColor = '#C60606'; break;
      case 'fighting': this.firstColor = '#FFB4AD', this.secondColor = '#9D183B'; break;
      case 'water': this.firstColor = '#86D4E1', this.secondColor = '#3055CF'; break;
      case 'bug': this.firstColor = '#CEE4AE', this.secondColor = '#8FCC2E'; break;
      case 'normal': this.firstColor = '#BBD3D6', this.secondColor = '#586578'; break;
      case 'poison': this.firstColor = '#EFB5FE', this.secondColor = '#582580'; break;
      case 'electric': this.firstColor = '#E3E370', this.secondColor = '#EA9000'; break;
      case 'ground': this.firstColor = '#EEE0B2', this.secondColor = '#8F733D'; break;
      case 'psychic': this.firstColor = '#E6A9B3', this.secondColor = '#B50962'; break;
      case 'ghost': this.firstColor = '#A7D3D7', this.secondColor = '#6A269D'; break;
      case 'fairy': this.firstColor = '#FFCBF2', this.secondColor = '#FF6DB4'; break;
      case 'dark': this.firstColor = '#A2B9C8', this.secondColor = '#060943'; break;
      case 'rock': this.firstColor = '#BFBFBF', this.secondColor = '#2D2933'; break;
      case 'ice': this.firstColor = '#A9E3DD', this.secondColor = '#42D5D5'; break;
      case 'steel': this.firstColor = '#C9D5DE', this.secondColor = '#6F9CBC'; break;
      case 'dragon': this.firstColor = '#7CAFFB', this.secondColor = '#861DD7'; break;
      case 'flying': this.firstColor = '#9FEFEF', this.secondColor = '#64A2CE'; break;
      default: this.firstColor = '#fff', this.secondColor = '#fff'; break;
    }
  }

  getGradient(): string {
    this.pokemonDetails[this.id].firstColor = this.firstColor;
    this.pokemonDetails[this.id].secondColor = this.secondColor;
    return `linear-gradient(-200deg, ${this.firstColor}, ${this.secondColor})`;
  }

  getKeyColor(): string {
    return `${this.secondColor}`;
  }

  getIsTeam(): string {
    const color = this.pokemonDetails[this.id].isIsTeam ? '#E40004' : '#fff';
    return color;
  }

  getIsFavorite(): string {
    const color = this.pokemonDetails[this.id].isIsFavorite ? '#FF8800' : '#fff';
    return color;
  }

  changeTeam() {
    console.log(this.id)
    this.pokemonDetails[this.id].isIsTeam = !this.pokemonDetails[this.id].isIsTeam;
    this.api.switchPokemonHandler(this.id.toString(), 'team', this.pokemonDetails[this.id].isIsTeam);
  }

  changeFavorite() {
    this.pokemonDetails[this.id].isIsFavorite = !this.pokemonDetails[this.id].isIsFavorite;
    this.api.switchPokemonHandler(this.id.toString(), 'favorite', this.pokemonDetails[this.id].isIsFavorite);
  }

  playSound() {
    const audio = new Audio(this.pokemonDetails[this.id].cries.latest);
    audio.volume = 0.25;
    audio.currentTime = 0;
    audio.play();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
