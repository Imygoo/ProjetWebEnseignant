import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'applienseignant';

  isAuth = false;

  ngOnInit(): void {
    this.verifAuth();
  }

  async logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  async verifAuth() {
    const token = localStorage.getItem('token') ?? '';
    let res = await fetch('http://localhost:5000/api/auth/me', {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    }).then(async res => {
      let data = await res.json();
      let _id = data.teacher.teacher._id;
      let response = await fetch('http://localhost:5000/api/teachers/' + _id);
      let teacher = await response.json();
      if (teacher) {
        return true;
      }
      else {
        return false;
      }
    });

    if (res) {
      this.isAuth = true;
    }
  }
}