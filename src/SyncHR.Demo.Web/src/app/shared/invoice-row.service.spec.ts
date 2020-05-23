import { TestBed } from '@angular/core/testing';

import { InvoiceRowService } from './invoice-row.service';

describe('InvoiceRowService', () => {
  let service: InvoiceRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
