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
    this.http.post('http://localhost:3000/api/auth/login',
    { email: this.username, password: this.password },
    { observe: 'response' }).subscribe(result => {

      this.router.navigate(['user']);
      // const bearer = result.headers.get('access_token');
      // const header = new HttpHeaders().set('Authorization', `Bearer ${bearer}`);

      // this.http.get('http://localhost:3000/api/user/read', { headers: header }).subscribe(response => {
      //   console.log(response);
      // });
    });
  }

  register() {
    console.log('register');
    this.http.post('http://localhost:3000/api/auth/register', { email: this.username, password: this.password }).subscribe(result => {
      console.log(result);
    },
    error => {
    });
    // this.router.navigate(['user']);
  }


  ngOnInit() {
  }

}
