import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionPageComponent } from './competition-page.component';

describe('CompetitionPageComponent', () => {
  let component: CompetitionPageComponent;
  let fixture: ComponentFixture<CompetitionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
