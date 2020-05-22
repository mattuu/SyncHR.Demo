import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private _httpClient: HttpClient) { }

  get(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/client`)
  }

  find(searchText: string, count: number = 10): Observable<any> {
    if (searchText && searchText.length > 0) {
      return this._httpClient.get(`${environment.baseUrl}/client/search?searchText=${searchText}&page=${count}`);
    }
    return of([]);
  }
}