import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  emailValue: any = 'testse';
  passwordValue: any = 'test';

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.emailValue);
    console.log(this.passwordValue);
  }

  set email(value) {
    this.emailValue = value;
    console.log(this.emailValue);
  }
  get email() {
    return this.emailValue;
  }
  set password(value) {
    this.passwordValue = value;
  }
  get password() {
    return this.passwordValue;
  }
}
