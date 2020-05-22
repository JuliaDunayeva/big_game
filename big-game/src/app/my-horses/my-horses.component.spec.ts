import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHorsesComponent } from './my-horses.component';

describe('MyHorsesComponent', () => {
  let component: MyHorsesComponent;
  let fixture: ComponentFixture<MyHorsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHorsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHorsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
