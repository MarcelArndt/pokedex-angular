import { TestBed } from '@angular/core/testing';

import { PokeApiLoaderService } from './poke-api-loader.service';

describe('PokeApiLoaderService', () => {
  let service: PokeApiLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeApiLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
