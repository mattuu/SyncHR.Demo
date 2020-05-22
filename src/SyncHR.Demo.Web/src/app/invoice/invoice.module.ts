import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MatSliderModule } from '@angular/material/slider';
import { InvoiceListComponent, EditInvoiceComponent } from '.';


@NgModule({
  declarations: [InvoiceListComponent, EditInvoiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSliderModule
  ]
})
export class InvoiceModule { }
