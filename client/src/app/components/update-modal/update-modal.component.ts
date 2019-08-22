import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import * as async from 'async';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.less']
})
export class UpdateModalComponent implements OnInit, AfterViewInit {
  public selectDataSources = {};
  public selectDataSourcesReady = false;

  constructor(public dialogRef: MatDialogRef<UpdateModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  , private snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickButtonSave(e, dataItem) {
    if (!this.data.transport || !this.data.transport.service || !this.data.transport.update) {
      return this.dialogRef.close();
    }

    this.data.transport.service[this.data.transport.update](dataItem).subscribe(result => {
      this.dialogRef.close();
    }, error => {
      this.snackBar.open('İşlem Başarısız!', 'HATA', { duration: 2000 });
    });
  }

  onChangeEditableField(evt, dataItem, data, field) {
    dataItem['dirty'] = true;

    if (field.type === 'date' || (dataItem && dataItem[field.name] && dataItem[field.name].utc)) {
      const time = moment().format('HH:mm:ss');
      const dateTime = moment(dataItem[field.name].format('DD.MM.YYYY') + ' ' + moment().format('HH:mm:ss'), 'DD.MM.YYYY HH:mm:ss');
      dataItem[field.name] = dateTime.utc().toISOString();
    }
  }

  private setSelectDataSources(callback?) {
    const enums = _.filter(this.data.fields, { type: 'enum'});

    async.each(enums, (item, next) => {
      item.data.subscribe(data => {
        this.selectDataSources = this.selectDataSources ? this.selectDataSources : {};
        this.selectDataSources[item.name] = data;
        next();
      }, error => {
        next(error);
      });
    }, err => {
      if (err) {
        return callback ? callback(err) : null;
      }
      return callback ? callback(null, this.selectDataSources) : null;
    });
  }

  ngAfterViewInit() {
    this.setSelectDataSources();
  }

  ngOnInit() {

  }

}
