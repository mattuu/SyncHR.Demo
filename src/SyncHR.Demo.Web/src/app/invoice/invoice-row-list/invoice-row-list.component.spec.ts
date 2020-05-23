import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRowListComponent } from './invoice-row-list.component';

describe('InvoiceRowListComponent', () => {
  let component: InvoiceRowListComponent;
  let fixture: ComponentFixture<InvoiceRowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceRowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
