import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class InvoiceExportService {
  constructor(private _httpClient: HttpClient) { }

  getPdf(id: number): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/invoiceexport/${id}/pdf`, { observe: 'response', responseType: 'blob' })
      .pipe(map((res: HttpResponse<Blob>) => {
        return res.body;
      }));
  }
}