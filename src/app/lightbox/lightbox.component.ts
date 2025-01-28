import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-lightbox',
  standalone: true, // Hier die Standalone-Deklaration
  imports: [IconComponent, CommonModule], // Wichtige Imports für ngClass und andere Features
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss', './animations.scss']
})
export class LightboxComponent {
  public showLightBox = false;
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

  ngOnInit() {
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }


  getGradient(): string {
    return `linear-gradient(-200deg, ${this.pokemonDetails.firstColor}, ${this.pokemonDetails.secondColor})`;
  }

}
