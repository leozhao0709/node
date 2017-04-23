import { TestBed, inject } from '@angular/core/testing';

import { ServerResolverService } from './server-resolver.service';

describe('ServerResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerResolverService]
    });
  });

  it('should ...', inject([ServerResolverService], (service: ServerResolverService) => {
    expect(service).toBeTruthy();
  }));
});
