import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRowListCellComponent } from './invoice-row-list-cell.component';

describe('InvoiceRowListCellComponent', () => {
  let component: InvoiceRowListCellComponent;
  let fixture: ComponentFixture<InvoiceRowListCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceRowListCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRowListCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
