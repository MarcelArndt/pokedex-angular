import { Injectable } from '@angular/core';
import { PokeApiLoaderService } from '../../../service/poke-api-loader.service';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {

  constructor(public api: PokeApiLoaderService) { }

  showLightBox = false;
  pokemonDetails: any;
  lightboxClass = 'init';
  pokeId?: number;

  closeLightbox() {
    this.lightboxClass = 'closeLightbox';
    this.showLightBox = false;
  }

  openLightbox(pokemonId: number) {
    this.api.pokemonOverviewList$.subscribe(data => {
      this.pokemonDetails = data[pokemonId];
    });
    this.pokeId = pokemonId;
    this.lightboxClass = 'openLightbox';
    this.showLightBox = true;
  }

}
