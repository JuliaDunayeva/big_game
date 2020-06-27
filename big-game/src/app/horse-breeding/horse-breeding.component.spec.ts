import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseBreedingComponent } from './horse-breeding.component';

describe('HorseBreedingComponent', () => {
  let component: HorseBreedingComponent;
  let fixture: ComponentFixture<HorseBreedingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorseBreedingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseBreedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
