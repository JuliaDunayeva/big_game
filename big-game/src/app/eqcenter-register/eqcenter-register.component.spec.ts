import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqcenterRegisterComponent } from './eqcenter-register.component';

describe('EqcenterRegisterComponent', () => {
  let component: EqcenterRegisterComponent;
  let fixture: ComponentFixture<EqcenterRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqcenterRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqcenterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
