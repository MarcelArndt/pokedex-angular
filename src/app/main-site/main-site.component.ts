import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PokeApiLoaderService } from '../service/poke-api-loader.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { LightboxService } from '../lightbox/lightbox-box-content/lightbox-service/lightbox.service';
import { PokeLoaderClockComponent } from '../poke-loader-clock/poke-loader-clock.component';
import { WikiServiceService } from '../pokemon-wiki/service/wiki-service.service';

interface type {
  slot?: number;
  type?: {
    name: string;
    url: string;
  };
}

@Component({
  selector: 'app-main-site',
  imports: [HeaderComponent, CardComponent, CommonModule, LightboxComponent, PokeLoaderClockComponent],
  templateUrl: './main-site.component.html',
  styleUrl: './main-site.component.scss'
})

export class MainSiteComponent {
  constructor(public api: PokeApiLoaderService, public lightboxService: LightboxService, public wiki: WikiServiceService) { }

  renderMax: number = 40;
  addAmountOfRenderMax: number = 10;
  renderMaxCooldownDate: number = new Date().getTime();
  renderMaxCooldowntime: number = 250;
  filter: string = 'all'

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.hasScrollbar()) {
      this.renderMax += this.addAmountOfRenderMax;
      return
    }
    const currentScrollScore = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    const currentTime = new Date().getTime();
    if (currentScrollScore && this.renderMaxCooldownDate + this.renderMaxCooldowntime <= currentTime) {
      this.renderMaxCooldownDate = new Date().getTime();
      this.renderMax = currentScrollScore ? this.renderMax += this.addAmountOfRenderMax : this.renderMax;
    }
  }

  openLightbox(id: number) {
    this.lightboxService.openLightbox(id);
    this.wiki.changeId(id);
  }

  hasScrollbar(): boolean {
    return document.body.scrollHeight > 0;
  }

  async ngOnInit() {
    await this.api.pullOverview();
    await this.api.recursivelyPokeloader(0, 0, 1012);
  }

  trackByFlag(index: number, pokemon: any): any {
    return pokemon.isReadyToRender;
  }

  applyfilter(listOfTypes: type[]): boolean {
    if (this.filter == 'all' || this.filter == '') return true;
    if (listOfTypes) {
      for (let i = 0; i < listOfTypes.length; i++) {
        if (this.filter == listOfTypes[i].type?.name) {
          return true
        }
      }
    }
    return false;
  }






}
