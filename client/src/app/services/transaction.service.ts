import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  public getTransactions(payload: any) {
    return this.http.get('/Transaction/GetTransactions', this.httpOptions(payload));
  }

  public getTransactionTypes() {
    return this.http.get('/Transaction/GetTransactionTypes', this.httpOptions());
  }

  public insertTransaction(payload: any) {
    return this.http.post('/Transaction/InsertTransaction', this.createFormData(payload));
  }

  public updateTransaction(payload: any) {
    return this.http.post('/Transaction/UpdateTransaction', this.createFormData(payload));
  }

  public setTransactionStateToComplete(payload: any) {
    return this.http.post('Transaction/SetTransactionStateToComplete', this.createFormData(payload));
  }

  public setTransactionStateToCancelled(payload: any) {
    return this.http.post('Transaction/SetTransactionStateToCancelled', this.createFormData(payload));
  }

  public setTransactionStateToRefunded(payload: any) {
    return this.http.post('Transaction/SetTransactionStateToRefunded', this.createFormData(payload));
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
