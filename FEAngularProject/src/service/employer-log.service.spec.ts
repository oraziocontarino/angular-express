import { TestBed, inject } from '@angular/core/testing';

import { EmployerLogService } from './employer-log.service';

describe('EmployerLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployerLogService]
    });
  });

  it('should be created', inject([EmployerLogService], (service: EmployerLogService) => {
    expect(service).toBeTruthy();
  }));
});
