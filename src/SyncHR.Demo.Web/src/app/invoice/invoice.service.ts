import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ICreateOrUpdateInvoiceModel {
  year: number;
  month: number;
  number: number;
  sellDate: Date;
  issueDate: Date;
  clientId: number;
  payTime: number;
  isPaid: number;
  paymentTypeId: number;
  grossAmount: number;
  netAmount: number;
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private _httpClient: HttpClient) {
  }

  get(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.baseUrl}/invoice`);
  }

  find(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.baseUrl}/invoice/${id}`);
  }

  update(id: number, model: ICreateOrUpdateInvoiceModel): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/invoice/${id}`, model);
  }

  create(model: ICreateOrUpdateInvoiceModel): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/invoice`, model);
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(`${environment.baseUrl}/invoice/${id}`);
  }
}