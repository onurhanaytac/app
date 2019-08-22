import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';

import { routes, navigatableComponents } from './app.routing';
import { materialComponents } from './app.material';
import { MatPaginatorIntl } from '@angular/material';

import { registerLocaleData } from '@angular/common';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import localeTr from '@angular/common/locales/tr';
registerLocaleData(localeTr);

import { HTTPListener, HTTPStatus } from './services/interceptor.service';
import { IsoDate } from './pipes/iso-date.pipe';
import { LiraPipe } from './pipes/lira.pipe';
import { UserComponent } from './user/user.component';

function intl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Sayfa başına satır';
  paginatorIntl.nextPageLabel = 'Sonraki sayfa';
  paginatorIntl.previousPageLabel = 'Önceki sayfa';
  paginatorIntl.lastPageLabel = 'Son sayfa';
  paginatorIntl.firstPageLabel = 'İlk Sayfa';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const startIndex = page * pageSize;
      const endIndex = (page + 1) * pageSize;

      return `${startIndex + 1} - ${endIndex} / ${length}`;
  };

  return paginatorIntl;
}

MAT_MOMENT_DATE_FORMATS.display.dateInput = 'L';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents,
    GridComponent,
    UpdateModalComponent,
    IsoDate,
    LiraPipe,
    UserComponent
  ],
  entryComponents: [
    UpdateModalComponent
  ],
  imports: [
    ...materialComponents,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    HTTPListener,
    HTTPStatus,
    { provide: LOCALE_ID, useValue: 'tr' },
    { provide: MAT_DATE_LOCALE, useValue: 'tr' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MatPaginatorIntl, useValue: intl() },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
