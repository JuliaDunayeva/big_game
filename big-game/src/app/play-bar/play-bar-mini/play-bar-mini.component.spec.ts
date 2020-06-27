import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBarMiniComponent } from './play-bar-mini.component';

describe('PlayBarMiniComponent', () => {
  let component: PlayBarMiniComponent;
  let fixture: ComponentFixture<PlayBarMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayBarMiniComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayBarMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
