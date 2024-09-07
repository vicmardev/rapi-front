import { TestBed } from '@angular/core/testing';

import { SkullsService } from './skulls.service';

describe('SkullsService', () => {
  let service: SkullsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkullsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
