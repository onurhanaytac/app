import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(payload: any) {
    return this.http.get('/User/GetUsers', this.httpOptions(payload));
  }

  public setUserUseLicense(payload: any) {
    payload.profilePicture = '';

    return this.http.post('/User/SetUserUseLicense', this.createFormData(payload));
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
