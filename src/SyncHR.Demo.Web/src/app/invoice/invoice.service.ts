import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

}