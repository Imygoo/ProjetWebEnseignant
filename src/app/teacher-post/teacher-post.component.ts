import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-post',
  templateUrl: './teacher-post.component.html',
  styleUrls: ['./teacher-post.component.css']
})
export class TeacherPostComponent implements OnInit {

  firstname = '';
  lastname = '';
  email = '';
  maxHours = 0;
  password = '';
  status = '';

  constructor() { }

  async ngOnInit(): Promise<void> {
  }

  async back() {
    window.history.back();
  }

  async save() {
    const res = await fetch('http://localhost:5000/api/teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        maxHours: this.maxHours,
        password: this.password,
        status: this.status
      })
    });
    const response = await res.json();
    window.history.back();
  }
}
