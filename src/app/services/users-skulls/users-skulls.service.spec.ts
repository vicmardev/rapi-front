import { TestBed } from '@angular/core/testing';

import { UsersSkullsService } from './users-skulls.service';

describe('UsersSkullsService', () => {
  let service: UsersSkullsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersSkullsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
