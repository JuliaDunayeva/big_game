import { TestBed } from '@angular/core/testing';

import { HorseDataService } from './horse-data.service';

describe('HorseDataService', () => {
  let service: HorseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
