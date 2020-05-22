import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private _httpClient: HttpClient) { }

  get(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/client`)
  }
}