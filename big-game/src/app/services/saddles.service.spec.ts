import { TestBed } from '@angular/core/testing';

import { SaddlesService } from './saddles.service';

describe('SaddlesService', () => {
  let service: SaddlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaddlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
