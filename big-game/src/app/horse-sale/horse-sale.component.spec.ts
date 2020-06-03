import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseSaleComponent } from './horse-sale.component';

describe('HorseSaleComponent', () => {
  let component: HorseSaleComponent;
  let fixture: ComponentFixture<HorseSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorseSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
