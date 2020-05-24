import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent, EditInvoiceComponent } from './invoice';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'invoices', pathMatch: 'full' },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'new', component: EditInvoiceComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },
  { path: 'invoice/:id/edit', component: EditInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
