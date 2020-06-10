import { TestBed } from '@angular/core/testing';

import { BrownSaddleService } from './brown-saddle.service';

describe('BrownSaddleService', () => {
  let service: BrownSaddleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrownSaddleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
