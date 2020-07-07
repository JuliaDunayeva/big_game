import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqcenterComponent } from './eqcenter.component';

describe('EqcenterComponent', () => {
  let component: EqcenterComponent;
  let fixture: ComponentFixture<EqcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
