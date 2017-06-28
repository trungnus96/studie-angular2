import { TestBed, inject } from '@angular/core/testing';

import { DegreeService } from './degree.service';

describe('DegreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DegreeService]
    });
  });

  it('should ...', inject([DegreeService], (service: DegreeService) => {
    expect(service).toBeTruthy();
  }));
});
