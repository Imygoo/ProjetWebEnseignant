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
  nbUC = 0;
  password = '';
  status = '';

  statusList:any = [];

  constructor() { }

  async ngOnInit(): Promise<void> {
    let data = await this.getStatus();
    let temp:any = [];
    data.forEach((element: any) => {
       temp.push(element.name);
    });
    this.statusList = temp;
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
        nbUC: this.nbUC,
        password: this.password,
        status: this.status
      })
    });
    const response = await res.json();
    window.history.back();
  }

  // get all status
  async getStatus() {
    const res = await fetch('http://localhost:5000/api/status');
    const response = await res.json();
    return response;
  }
}
