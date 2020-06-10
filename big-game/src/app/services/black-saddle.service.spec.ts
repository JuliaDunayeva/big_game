import { TestBed } from '@angular/core/testing';

import { BlackSaddleService } from './black-saddle.service';

describe('BlackSaddleService', () => {
  let service: BlackSaddleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackSaddleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
