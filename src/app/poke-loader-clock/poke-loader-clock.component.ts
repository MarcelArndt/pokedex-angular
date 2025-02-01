import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeApiLoaderService } from '../service/poke-api-loader.service';

@Component({
  selector: 'app-poke-loader-clock',
  imports: [CommonModule],
  templateUrl: './poke-loader-clock.component.html',
  styleUrl: './poke-loader-clock.component.scss'
})
export class PokeLoaderClockComponent {
  constructor(public api: PokeApiLoaderService) { }
  maxWidthInPercentage = 100;

  get loadingBarWidth() {
    const currentValue = this.api?.maxAmount! / this.api?.currentNumber! * 100;
    const lenght = this.maxWidthInPercentage / currentValue * 100;
    return lenght
  }
}
