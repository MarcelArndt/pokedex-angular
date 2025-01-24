import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PokeApiLoaderService } from '../service/poke-api-loader.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-site',
  imports: [HeaderComponent, CardComponent, CommonModule],
  templateUrl: './main-site.component.html',
  styleUrl: './main-site.component.scss'
})
export class MainSiteComponent {
  constructor(public api: PokeApiLoaderService) { }

  async ngOnInit() {
    await this.api.pullOverview();
    await this.api.recursivelyPokeloader(550, 0);
  }

  trackByFlag(index: number, pokemon: any): any {
    return pokemon.isReadyToRender;
  }
}
