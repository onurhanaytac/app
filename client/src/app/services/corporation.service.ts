import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CorporationService {

  constructor(private http: HttpClient) { }

  public getCorporation(payload: any) {
    payload.profilePicture = '';

    return this.http.get('/Corporation/GetCorporation', this.httpOptions(payload));
  }

  public getCorporations(payload: any) {
    return this.http.get('/Corporation/GetCorporations', this.httpOptions(payload));
  }

  public setCorporationLicense(payload: any) {
    return this.http.post('/Corporation/SetCorporationLicense', this.createFormData(payload));
  }

  private httpOptions(payload?: any) {
    return { headers: this.createHeaders(), params: payload ? this.createParams(payload) : null };
  }

  private createParams(payload: any) {
    return new HttpParams({ fromObject: payload });
  }

  private createHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private createFormData(payload: any) {
    const formData = new FormData();
    _.each(_.keys(payload), key => {
      formData.append(key.toString(), payload[key] ? payload[key].toString() : payload[key]);
    });

    return formData;
  }
}
