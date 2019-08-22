import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  username = 'onurhanaytac@gmail.com';
  password = 'Onurhan123@';

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    console.log('login');

    this.http.post('http://localhost:3000/api/auth/login', { email: this.username, password: this.password }).subscribe(result => {
      this.http.get('http://localhost:3000/api/user/read').subscribe(_result => {
      },
      error => {
      });
    },
    error => {
    });

    // this.router.navigate(['user']);
  }

  ngOnInit() {
    console.log('here');
  }

}
