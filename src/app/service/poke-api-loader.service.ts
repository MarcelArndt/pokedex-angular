import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiLoaderService {

  constructor() {

  }

  public pokemonOverviewList$ = new BehaviorSubject<any[]>([]);
  pokeminInTeam?: string[];
  pokeminInFavorite?: string[];
  tempFromLocalStorage?: string = '';


  async pullOverview(maxAmount: number = 1011) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${maxAmount}&offset=0`;
      const response = await fetch(url);
      const pokedata = await response.json();
      const currentListOfPokemons = this.pokemonOverviewList$.value;
      pokedata.results.forEach((pokemon: any, id: number) => {
        pokemon.id = id + 1;
        pokemon.isReadyToRender = false;
        pokemon.isTeam = false;
        pokemon.isFavorite = false;
        currentListOfPokemons.push(pokemon);
        this.pokemonOverviewList$.next([...currentListOfPokemons]);
      });
      this.loadFromLocalStorage();
      //this.preloadKnownPokemon();
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
      this.pokemonOverviewList$.next([...currentListOfPokemons]);
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
      return pokedataPackages
    } catch (error) {
      console.error(error);
    }
  }

  async recursivelyPokeloader(timer: number = 1000, id: number = 0) {
    const currentListOfPokemons = this.pokemonOverviewList$.value;
    setTimeout(() => {
      this.getPokemonData(id + 1);
      this.pokemonOverviewList$.next([...currentListOfPokemons]);
      if (id <= currentListOfPokemons.length) {
        this.recursivelyPokeloader(timer, id + 1);
      }
    }, timer);
  }

  getPokemonOverviewList(): Observable<any[]> {
    return this.pokemonOverviewList$.asObservable();
  }


  saveInLocalStroage(team: string[] = this.pokeminInTeam || [], favorite: string[] = this.pokeminInTeam || []) {
    const atrribute = { team: team, favorite: favorite };
    const obj = JSON.stringify(atrribute);
    localStorage.setItem("PokemonDex", obj);
  }

  loadFromLocalStorage() {
    if (this.checkForStroage()) {
      const currentStroage = this.tempFromLocalStorage || '[],[]';
      let list = JSON.parse(currentStroage);
      this.pokeminInTeam = list[0];
      this.pokeminInFavorite = list[1];
    }
  }

  checkForStroage(): boolean {
    this.tempFromLocalStorage = localStorage.getItem("PokemonDex") || '';
    if (this.tempFromLocalStorage.length == 0) {
      this.saveInLocalStroage([], []);
    }
    return true;
  }





}
