import { TestBed, inject } from '@angular/core/testing';

import { SheetFileService } from './sheet-file.service';

describe('SheetFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetFileService]
    });
  });

  it('should ...', inject([SheetFileService], (service: SheetFileService) => {
    expect(service).toBeTruthy();
  }));
});
