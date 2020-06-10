import { TestBed } from '@angular/core/testing';

import { DarkBrownSaddleService } from './dark-brown-saddle.service';

describe('DarkBrownSaddleService', () => {
  let service: DarkBrownSaddleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkBrownSaddleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
