import { TestBed } from '@angular/core/testing';

import { CardlaveritaService } from './cardlaverita.service';

describe('CardlaveritaService', () => {
  let service: CardlaveritaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardlaveritaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
