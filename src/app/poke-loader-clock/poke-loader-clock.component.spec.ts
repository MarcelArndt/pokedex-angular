import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeLoaderClockComponent } from './poke-loader-clock.component';

describe('PokeLoaderClockComponent', () => {
  let component: PokeLoaderClockComponent;
  let fixture: ComponentFixture<PokeLoaderClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeLoaderClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeLoaderClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
