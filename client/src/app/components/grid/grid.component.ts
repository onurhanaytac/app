import { Component, OnInit, ViewChild, ElementRef, Renderer, Input, NgZone, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

import * as _ from 'lodash';
import * as moment from 'moment';
import * as async from 'async';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnDestroy {
  public displayedColumns: string[];
  public newRowDisplayedColumns: string[];
  public pageOptions = {
    page: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    searchText: '',
    totalCount: 0
  };
  public data = [];
  public newRow = false;
  private tableInputListener;
  public tableHeight = 'calc(100% - 120px)';
  public test = 0;
  public selectDataSources = {};
  private timeoutId;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('sidenavContainer', {static: false}) sidenavContainer: ElementRef;

  @Input() public properties;
  @Input() height = '421px';

  constructor(private zone: NgZone, renderer: Renderer, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.tableInputListener = renderer.listen('body', 'keypress', (evt) => {
      if (evt.target && evt.target.localName !== 'input') {
        return;
      }

      if (evt.key === 'Enter' || evt.keyCode === 13) {
        evt.shiftKey ? this.focusPreviousEditable(evt) : this.focusNextEditable(evt);
      }
    });
  }

  private onClickButtonAddNewDataItem() {
    this.newRow = !this.newRow;
  }

  private focusPreviousEditable(evt) {
    const inputs = document.getElementsByTagName('input');
    const targetInput = evt.target;

    let found = false;
    let previousInput;

    _.each(inputs, input => {
      if (found === true) {
        return false;
      }

      if (input === targetInput) {
        return found = true;
      }

      previousInput = input;
    });

    if (!previousInput) {
      return targetInput.blur();
    }
    previousInput.focus();
    previousInput.select();
  }

  private focusNextEditable(evt) {
    const inputs = document.getElementsByTagName('input');
    const targetInput = evt.target;

    let found = false;
    let nextInput;

    _.each(inputs, input => {
      if (found === true) {
        nextInput = input;
        return false;
      }

      if (input === targetInput) {
        found = true;
      }
    });

    if (!nextInput) {
      return targetInput.blur();
    }
    nextInput.focus();
    nextInput.select();
  }

  public read(callback?) {
    this.properties.dataSource.transport.service[this.properties.dataSource.transport.read](this.pageOptions)
    .subscribe(data => {
      this.data = (data as any);
      if (!callback) {
        return;
      }
      callback(null, this.data);
    }, error => {
      callback(error);
    });
  }

  public init() {
    if (!this.paginator) {
      return;
    }
    this.paginator.page.pipe(
      startWith({ pageIndex: 0, pageSize: this.properties.pageable ? this.properties.pageable.pageSize : this.pageOptions.pageSize }),
      switchMap((e) => {

        this.setPage(e);

        return this.properties.dataSource.transport.service[this.properties.dataSource.transport.read](this.pageOptions);
      }),
      map(data => {
        this.pageOptions.totalCount = (data as any).length ? data[0].totalCount : 0;
        return data;
      })
    ).subscribe(data => this.data = (data as any));
  }

  private setPage(e) {
    this.pageOptions.page = e.pageIndex + 1;
    this.pageOptions.pageSize = e.pageSize;
  }

  private setDisplayedColumns() {
    this.displayedColumns = _.map(_.filter(this.properties.fields, 'display'), 'name');
    this.newRowDisplayedColumns = _.map(_.filter(this.properties.fields, 'display'), field => {
      return field.name + '-new';
    });
  }

  private onChangeEditableField(evt, dataItem, data, field) {
    dataItem['dirty'] = true;

    if (field.type === 'date' || (dataItem && dataItem[field.name] && dataItem[field.name].utc)) {
      const time = moment().format('HH:mm:ss');
      const dateTime = moment(dataItem[field.name].format('DD.MM.YYYY') + ' ' + moment().format('HH:mm:ss'), 'DD.MM.YYYY HH:mm:ss');
      dataItem[field.name] = dateTime.utc(true).toISOString();
    }

    if (!this.properties.dataSource.transport.service || !this.properties.dataSource.transport.update) {
      throw new Error('There is no service or update method defined!');
    }

    this.updateCell(dataItem);
  }

  private updateCell(dataItem) {
    this.properties.dataSource.transport.service[this.properties.dataSource.transport.update](dataItem).subscribe(response => {
      this.read();
    }, error => {
      this.snackBar.open('İşlem Başarısız!', 'HATA', { duration: 2000 });
    });
  }

  private onClickButtonSaveNewRow(event, dataItem, data) {
    this.properties.dataSource.transport.service[this.properties.dataSource.transport.create](dataItem).subscribe(response => {}, error => {
      this.snackBar.open('İşlem Başarısız!', 'HATA', { duration: 2000 });
    });
  }

  private get format() {
    return 'n2';
  }

  private setEnumValue(field) {
    return 'asd';
  }

  private setTableHeight() {
    let shortening = 120;
    if (!this.properties.toolbar) {
      shortening -= 64;
    }

    if (!this.properties.pageable) {
      shortening -= 56;
    }

    this.tableHeight = 'calc(100% - ' + shortening + 'px)';
  }

  public onSearchKeyPress(event) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.timeoutId = setTimeout(() => {
      this.read();
    }, 500);
  }

  public onSelectionChange(evt) {
  }

  private setSelectDataSources(callback?) {
    const enums = _.filter(this.properties.fields, { type: 'enum'});

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

  private openUpdateModal(e, dataItem, fields): void {
    const dialogRef = this.dialog.open(UpdateModalComponent, {
      width: '50%',
      height: '70%',
      data: {
        dataItem,
        fields,
        selectDataSources: this.selectDataSources,
        transport: this.properties.dataSource.transport
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.read();
    });
  }

  public getEnumValue(selectedDataSources, field, dataItem) {
    if (!selectedDataSources || !field || !dataItem) {
      return '';
    }

    const value = dataItem[field.name];
    const selectDataSource = selectedDataSources[field.name];
    const selectValue = _.filter(selectDataSource, item => {
      return item[field.name] === value;
    });

    return selectValue && selectValue[0] ? selectValue[0]['name'] : '';
  }

  setEditable(e, dataItem) {
    if (typeof e !== 'function') {
      return e;
    }

    return e(dataItem);
  }

  ngOnDestroy() {
    this.tableInputListener();
  }

  ngOnInit() {
    this.setSelectDataSources();
    this.setTableHeight();
    this.setDisplayedColumns();
    this.init();
  }
}
