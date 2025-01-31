import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiLoaderService {

  constructor() { }

  public pokemonOverviewList$ = new BehaviorSubject<any[]>([]);
  public pokeminInTeam: string[] = [];
  public pokeminInFavorite: string[] = [];

  ////  --- manage Api ---   ///
  async pullOverview(maxAmount: number = 1011) {
    try {
      this.loadFromLocalStorage();
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${maxAmount}&offset=0`;
      const response = await fetch(url);
      const pokedata = await response.json();
      const currentListOfPokemons = this.pokemonOverviewList$.value;
      pokedata.results.forEach((pokemon: any, id: number) => {
        pokemon.id = id + 1;
        pokemon.isReadyToRender = false;
        currentListOfPokemons.push(pokemon);
        this.pokemonOverviewList$.next([...currentListOfPokemons]);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getPokemonData(id: number) {
    try {
      const pokedata = await this.getResponsePackages(id);
      const currentListOfPokemons = this.pokemonOverviewList$.value;
      currentListOfPokemons[id - 1] = { ...pokedata };
      currentListOfPokemons[id - 1].isReadyToRender = true;
      return pokedata;
    } catch (error) {
      console.error(error);
    }
  }

  async getResponsePackages(id: number = 0) {
    try {
      const responseOne = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const responseTwo = await fetch(`https://pokeapi.co/api/v2/pokemon-species//${id}/`);
      const datasetOne = await responseOne.json();
      const datasetTwo = await responseTwo.json();
      const pokedataPackages = { ...datasetOne, ...datasetTwo };
      pokedataPackages.isIsFavorite = this.checkIdInArray(this.pokeminInFavorite, pokedataPackages.id);
      pokedataPackages.isIsTeam = this.checkIdInArray(this.pokeminInTeam, pokedataPackages.id);
      return pokedataPackages
    } catch (error) {
      console.error(error);
    }
  }

  async recursivelyPokeloader(timer: number = 1000, id: number = 0, maxAmount: number = 150) {
    if (id >= maxAmount) return;
    const currentListOfPokemons = this.pokemonOverviewList$.value;
    setTimeout(() => {
      this.getPokemonData(id + 1);
      this.pokemonOverviewList$.next([...currentListOfPokemons]);
      if (id <= currentListOfPokemons.length) {
        this.recursivelyPokeloader(timer, id + 1, maxAmount);
      }
    }, timer);
  }

  getPokemonOverviewList(): Observable<any[]> {
    return this.pokemonOverviewList$.asObservable();
  }

  checkIdInArray(array: string[], id: number) {
    let pokeminId = id - 1
    let string = pokeminId.toString();
    return array.includes(string);
  }

  ////  --- manage LocalStorage ---   ///

  saveInLocalStroage(team: string[] = this.pokeminInTeam || [], favorite: string[] = this.pokeminInFavorite || []) {
    const atrribute = { team: team, favorite: favorite };
    const obj = JSON.stringify(atrribute);
    localStorage.setItem("PokemonDex", obj);
  }

  loadFromLocalStorage() {
    let currentStroage = localStorage.getItem("PokemonDex");
    if (!currentStroage || currentStroage.length == 0) {
      this.saveInLocalStroage();
      return;
    }
    let list = JSON.parse(currentStroage);
    this.pokeminInTeam = list.team;
    this.pokeminInFavorite = list.favorite;
  }

  ////  --- manage personal categories ---   ///

  switchPokemonHandler(id: string, categorie: string = 'team', status: boolean) {
    if (status) {
      this.addPokemonToList(id, categorie);
    } else {
      this.removePokemonfromList(id, categorie);
    }
    this.saveInLocalStroage();
  }

  addPokemonToList(id: string, categorie: string) {
    switch (categorie) {
      case 'team': if (!this.pokeminInTeam.includes(id)) { this.pokeminInTeam.push(id); }; break;
      case 'favorite': if (!this.pokeminInFavorite.includes(id)) { this.pokeminInFavorite.push(id); }; break;
      default: console.error('ERROR: No Categorie Match'); break;
    }
  }

  removePokemonfromList(id: string, categorie: string) {
    switch (categorie) {
      case 'team': if (this.pokeminInTeam.includes(id)) { this.pokeminInTeam.splice(this.pokeminInTeam.indexOf(id), 1) }; break;
      case 'favorite': if (this.pokeminInFavorite.includes(id)) { this.pokeminInFavorite.splice(this.pokeminInFavorite.indexOf(id), 1) }; break;
      default: console.error('ERROR: No Categorie Match'); break;
    }
  }


}
