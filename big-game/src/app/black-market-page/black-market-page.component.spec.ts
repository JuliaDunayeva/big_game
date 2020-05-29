import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlackMarketPageComponent } from './black-market-page.component';

describe('BlackMarketPageComponent', () => {
  let component: BlackMarketPageComponent;
  let fixture: ComponentFixture<BlackMarketPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackMarketPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackMarketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
