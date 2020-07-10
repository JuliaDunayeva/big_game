import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TackPageComponent } from './tack-page.component';

describe('TackPageComponent', () => {
  let component: TackPageComponent;
  let fixture: ComponentFixture<TackPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TackPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
