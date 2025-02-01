import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonWikiComponent } from './pokemon-wiki.component';

describe('PokemonWikiComponent', () => {
  let component: PokemonWikiComponent;
  let fixture: ComponentFixture<PokemonWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonWikiComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
