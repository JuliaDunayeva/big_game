import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsePageComponent } from './horse-page.component';

describe('HorsePageComponent', () => {
  let component: HorsePageComponent;
  let fixture: ComponentFixture<HorsePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorsePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
