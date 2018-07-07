import { TestBed, inject } from '@angular/core/testing';

import { RestRequestService } from './rest-request.service';

describe('RestRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestRequestService]
    });
  });

  it('should be created', inject([RestRequestService], (service: RestRequestService) => {
    expect(service).toBeTruthy();
  }));
});
