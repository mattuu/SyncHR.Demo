import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';

export interface IUpdateInvoiceModel {
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

  public get(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.baseUrl}/invoice`);
  }

  public find(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.baseUrl}/invoice/${id}`);
  }

  public update(id: number, model: IUpdateInvoiceModel): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/invoice/${id}`, model).pipe(
      map((response: HttpResponse<any>) => {
        switch (response.status) {
          case 400:
            // TODO: handle validation error...
            break;
          case 200:
            return response.body;
          default:
            break;
        }
      }));
  }
}