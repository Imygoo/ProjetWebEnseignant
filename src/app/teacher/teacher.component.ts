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

  statusList: any = [];

  statusUser: any = null;
  subscriptions: any = [];
  totalUC: any = 0;

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


      this.statusUser = await this.getStatus(this.status);
      let subscriptions = await this.getSubscriptions();
      subscriptions.forEach(async (e: any) => {
        let education = await this.getEducation(e.id_education);
        e.education = education;
        this.subscriptions.push(e);

        this.totalUC += (e.grCM * this.statusUser.heureCM * e.education['h/CM']) + (e.grTD * this.statusUser.heureTD * e.education['h/TD']) + (e.grTP * this.statusUser.heureTP * e.education['h/TP']);
      });

    }
    this.waiting = false;
    this.verifAdmin();

    let data = await this.getStatuses();
    let temp: any = [];
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

  async getStatuses() {
    const res = await fetch('http://localhost:5000/api/status');
    const response = await res.json();
    return response;
  }

  async getTeacher(id: any) {
    const res = await fetch(`http://localhost:5000/api/teachers/${id}`);
    const teacher = await res.json();
    return teacher;
  }

  /////////////////////////////////////

  async getSubscriptions() {
    const token = localStorage.getItem('token') ?? '';
    let res = await fetch('http://localhost:5000/api/subscriptions/user/' + this._id, {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    });
    const response = await res.json();
    return response;
  }

  async getEducation(_id: any) {
    const token = localStorage.getItem('token') ?? '';
    let res = await fetch('http://localhost:5000/api/educations/' + _id, {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    });
    const response = await res.json();
    return response;
  }

  async getStatus(name: any) {
    const token = localStorage.getItem('token') ?? '';
    let res = await fetch('http://localhost:5000/api/status/name/' + name, {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    });
    const response = await res.json();
    return response[0];
  }
}