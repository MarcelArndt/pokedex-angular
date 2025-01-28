import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightboxBoxContentComponent } from './lightbox-box-content.component';

describe('LightboxBoxContentComponent', () => {
  let component: LightboxBoxContentComponent;
  let fixture: ComponentFixture<LightboxBoxContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightboxBoxContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightboxBoxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
