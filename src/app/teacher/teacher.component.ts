import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  isAdmin = false;
  waiting = true;
  teacher = null;
  _id = '';
  firstname = '';
  lastname = '';
  email = '';
  nbUC = 0;
  password = '';
  status = '';

  statusList:any = [];
  constructor(private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    let id = this.route.snapshot.paramMap.get('id');
    let response = await this.getTeacher(id);
    this.teacher = response;
    if (this.teacher) {
      this._id = response._id;
      this.firstname = response.firstname;
      this.lastname = response.lastname;
      this.email = response.email;
      this.nbUC = response.nbUC;
      this.password = response.password;
      this.status = response.status;
    }
    this.waiting = false;
    this.verifAdmin();

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
    const token = localStorage.getItem('token') ?? '';
    if (this.password != '' && this.status != '' && this.firstname != '' && this.lastname != '' && this.email != '') {
      const res = await fetch('http://localhost:5000/api/teachers/' + this._id, {
        method: 'PUT',
        headers: new Headers({
          'Authorization': 'Basic ' + token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          firstname: this.firstname,
          lastname: this.lastname,
          nbUC: this.nbUC,
          password: this.password,
          status: this.status,
          email: this.email
        })
      });

      window.location.reload();
    } else {
      alert("Veuillez remplir tous les champs");
    }
  }

  async verifAdmin() {
    const token = localStorage.getItem('token') ?? '';
    let res = await fetch('http://localhost:5000/api/auth/me', {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    });
    const response = await res.json();
    res = await fetch('http://localhost:5000/api/teachers/' + response.teacher.teacher._id);
    const teacher = await res.json();

    if (response.success && teacher.status === 'admin') {
      this.isAdmin = true;
    }
  }

  async getStatus() {
    const res = await fetch('http://localhost:5000/api/status');
    const response = await res.json();
    return response;
  }

  async getTeacher(id: any) {
    const res = await fetch(`http://localhost:5000/api/teachers/${id}`);
    const teacher = await res.json();
    return teacher;
  }
}