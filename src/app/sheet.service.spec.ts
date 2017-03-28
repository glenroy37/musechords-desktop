/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SheetService } from './sheet.service';

describe('SheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetService]
    });
  });

  it('should ...', inject([SheetService], (service: SheetService) => {
    expect(service).toBeTruthy();
  }));
});
