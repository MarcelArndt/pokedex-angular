import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxService } from './lightbox-service/lightbox.service';
import { IconComponent } from '../../icon/icon.component';
import { PokeApiLoaderService } from '../../service/poke-api-loader.service';

@Component({
  standalone: true,
  selector: 'lightbox-box-content',
  imports: [CommonModule, IconComponent],
  templateUrl: './lightbox-box-content.component.html',
  styleUrls: ['./lightbox-box-content.component.scss', './../animations.scss']
})
export class LightboxBoxContentComponent {
  constructor(public service: LightboxService, public api: PokeApiLoaderService) { }

  get gradient(): string {
    return `linear-gradient(-200deg, ${this.service.pokemonDetails.firstColor}, ${this.service.pokemonDetails.secondColor})`;
  }

  get team(): string {
    const color = this.service.pokemonDetails.isIsTeam ? '#E40004' : '#fff';
    return `${color}`
  }

  get favorite(): string {
    const color = this.service.pokemonDetails.isIsFavorite ? '#FF8800' : '#fff';
    return `${color}`
  }

  changeTeam() {
    this.service.pokemonDetails.isIsTeam = !this.service.pokemonDetails.isIsTeam;
    this.api.switchPokemonHandler(this.service?.pokeId!.toString(), 'team', this.service.pokemonDetails.isIsTeam);
  }

  changeFavorite() {
    this.service.pokemonDetails.isIsFavorite = !this.service.pokemonDetails.isIsFavorite;
    this.api.switchPokemonHandler(this.service?.pokeId!.toString(), 'favorite', this.service.pokemonDetails.isIsFavorite);
  }

  playSound() {
    const audio = new Audio(this.service.pokemonDetails.cries.latest);
    audio.volume = 0.25;
    audio.currentTime = 0;
    audio.play();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
