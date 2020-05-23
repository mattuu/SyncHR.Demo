import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MatSliderModule } from '@angular/material/slider';
import { InvoiceListComponent, EditInvoiceComponent } from '.';
import { InvoiceRowListComponent } from './invoice-row-list/invoice-row-list.component';
import { InvoiceRowListCellComponent } from './invoice-row-list/invoice-row-list-cell/invoice-row-list-cell.component';


@NgModule({
  declarations: [InvoiceListComponent, EditInvoiceComponent, InvoiceRowListComponent, InvoiceRowListCellComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSliderModule
  ]
})
export class InvoiceModule { }
