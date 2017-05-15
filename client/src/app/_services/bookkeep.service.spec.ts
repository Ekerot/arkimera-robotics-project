import { TestBed, inject } from '@angular/core/testing';

import { BookkeepService } from './bookkeep.service';

describe('BookkeepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookkeepService]
    });
  });

  it('should ...', inject([BookkeepService], (service: BookkeepService) => {
    expect(service).toBeTruthy();
  }));
});
