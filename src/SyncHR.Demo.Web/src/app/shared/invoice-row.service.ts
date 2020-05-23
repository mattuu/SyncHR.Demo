import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InvoiceRowsDataSource } from '../invoice/invoice-row-list/invoice-row-list.component';

export interface ICreateOrUpdateInvoiceRowModel {
  'productName': string;
  'quantity': number;
  'unit': string;
  'unitPrice': number;
}

@Injectable({ providedIn: 'root' })
export class InvoiceRowService {
  constructor(private _httpClient: HttpClient) { }

  update(id: number, model: InvoiceRowsDataSource | any) {
    return this._httpClient.put(`${environment.baseUrl}/invoiceRow/${id}`, model);
  }

  create(id: number, model: InvoiceRowsDataSource | any) {
    return this._httpClient.post(`${environment.baseUrl}/invoiceRow/${id}`, model);
  }

  delete(id: number) {
    return this._httpClient.delete(`${environment.baseUrl}/invoiceRow/${id}`);
  }
}