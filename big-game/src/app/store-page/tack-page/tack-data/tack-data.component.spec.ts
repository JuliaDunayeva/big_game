import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TackDataComponent } from './tack-data.component';

describe('TackDataComponent', () => {
  let component: TackDataComponent;
  let fixture: ComponentFixture<TackDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TackDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TackDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
