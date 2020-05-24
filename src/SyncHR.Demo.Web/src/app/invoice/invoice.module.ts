import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { InvoiceListComponent, EditInvoiceComponent } from '.';
import { InvoiceRowListComponent } from './invoice-row-list/invoice-row-list.component';
import { InvoiceRowListCellComponent } from './invoice-row-list/invoice-row-list-cell/invoice-row-list-cell.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceService } from './invoice.service';
import { InvoiceExportService } from './invoice-export.service';


@NgModule({
  declarations: [InvoiceListComponent,
    EditInvoiceComponent,
    InvoiceRowListComponent,
    InvoiceRowListCellComponent,
    InvoiceDetailsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    InvoiceService,
    InvoiceExportService
  ]
})
export class InvoiceModule { }
