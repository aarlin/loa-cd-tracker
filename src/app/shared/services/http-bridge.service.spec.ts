import { TestBed } from '@angular/core/testing';

import { HttpBridgeService } from './http-bridge.service';

describe('HttpBridgeService', () => {
  let service: HttpBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
