import { Component, ViewChild, Inject, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { HTTPStatus } from './services/interceptor.service';
import { AccountService } from './services/account.service';
import { DOCUMENT } from '@angular/common';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('snav', { static: false }) sidenav: MatSidenav;
  private mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;
  public sidenavOpend = true;
  public HTTPActivity: boolean;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private httpStatus: HTTPStatus, public accountService: AccountService, @Inject(DOCUMENT) private document: Document) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

  }

  public onClickButtonSignOut(e) {
    this.document.location.href = 'Account/SignOut';
  }

  ngAfterViewInit() {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      setTimeout(() => {
        this.HTTPActivity = status;
      });
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.mobileQuery && this.mobileQuery.matches) {
        // this.sidenav.close();
      }
    });
  }
}
