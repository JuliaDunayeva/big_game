import { TestBed } from '@angular/core/testing';

import { EqCenterServiceService } from './eq-center-service.service';

describe('EqCenterServiceService', () => {
  let service: EqCenterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EqCenterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
