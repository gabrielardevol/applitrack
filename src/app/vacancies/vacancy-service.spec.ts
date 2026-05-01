import { TestBed } from '@angular/core/testing';

import { VacanciesService } from './vacancy-service';

describe('VacanciesService', () => {
  let service: VacanciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacanciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
