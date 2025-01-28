import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {

  constructor() { }

  showLightBox = false;
  pokemonDetails: any;
  lightboxClass = 'init';

  closeLightbox() {
    this.lightboxClass = 'closeLightbox';
    this.showLightBox = false;
  }

  openLightbox(pokemon: any) {
    this.lightboxClass = 'openLightbox';
    this.pokemonDetails = pokemon;
    this.showLightBox = true;
    console.log(pokemon);
  }

}
