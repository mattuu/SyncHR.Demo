import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { SharedModule } from '../shared/shared.module';

import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [InvoiceListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSliderModule
  ]
})
export class InvoiceModule { }
