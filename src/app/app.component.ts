import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Appli Enseignant';
  isAuth = false;
  isAdmin = false;

  ngOnInit(): void {
    this.verifAuth();
  }

  async logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  async verifAuth() {
    const token = localStorage.getItem('token') ?? '';
    var promise = await fetch('http://localhost:5000/api/auth/me', {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    });

    var response = await promise.json();
    if (response.success) {
      var _id = response.teacher.teacher._id;
      promise = await fetch('http://localhost:5000/api/teachers/' + _id);
      var teacher = await promise.json();
      if (teacher) {
        this.isAuth = true;
        this.isAdmin = (teacher.status == 'admin');
      }
    }
  }
}