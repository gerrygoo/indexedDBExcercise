import { TestBed } from '@angular/core/testing';

import { DexieServiceService } from './dexie-service.service';

describe('DexieServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DexieServiceService = TestBed.get(DexieServiceService);
    expect(service).toBeTruthy();
  });
});
