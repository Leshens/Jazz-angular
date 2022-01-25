import { TestBed } from '@angular/core/testing';

import { ClientsSkipTestsService } from './clients--skip-tests.service';

describe('ClientsSkipTestsService', () => {
  let service: ClientsSkipTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsSkipTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
