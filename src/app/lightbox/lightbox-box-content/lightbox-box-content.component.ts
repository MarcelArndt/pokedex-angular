import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxService } from './lightbox-service/lightbox.service';
import { IconComponent } from '../../icon/icon.component';

@Component({
  standalone: true,
  selector: 'lightbox-box-content',
  imports: [CommonModule, IconComponent],
  templateUrl: './lightbox-box-content.component.html',
  styleUrls: ['./lightbox-box-content.component.scss', './../animations.scss']
})
export class LightboxBoxContentComponent {
  constructor(public service: LightboxService) { }

  getGradient(): string {
    return `linear-gradient(-200deg, ${this.service.pokemonDetails.firstColor}, ${this.service.pokemonDetails.secondColor})`;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
