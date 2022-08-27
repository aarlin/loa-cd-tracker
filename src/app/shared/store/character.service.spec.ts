import { TestBed } from '@angular/core/testing';

import { CharacterStoreService } from './character.service';

describe('CharacterStoreService', () => {
  let service: CharacterStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
