import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { States } from '../../shared/models/state';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  baseUrl?: string = environment.apiUrl + 'states'

  constructor(private httpClient: HttpClient) { }

  public getStates(): Observable<States[]> {
    return this.httpClient.get<States[]>(`${this.baseUrl}/getstates`);
  }
}
