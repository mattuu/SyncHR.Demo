import { TestBed } from '@angular/core/testing';

import { InvoiceExportService } from './invoice-export.service';

describe('InvoiceExportService', () => {
  let service: InvoiceExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
