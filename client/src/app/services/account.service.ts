import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public signOut() {
    return this.http.get('/Account/SignOut', this.httpOptions());
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
