import { Component, OnInit } from '@angular/core';
// import axios
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    let response = await loginRequest(this.email, this.password);
    this.message = response.data.message;
    if (response.data.success) {
      window.location.href = '/';
    }
  }
}

async function loginRequest(email: string, password: string) {
  let response = await axios.post('http://localhost:5000/api/auth/login', {
    email: email,
    password: password
  });

  // if response is OK
  if (response.data.success === true) {
    let token = response.data.token;
    localStorage.setItem('token', token);
  }

  return response;
}