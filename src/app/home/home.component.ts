import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any = null;
  _id: any = "";
  subscriptions: any = [];
  status:any = null;
  totalUC:any = 0;
  isAdmin:any = false;
  nbUC:any = 0;
  educations:any = [];

  constructor() { }

  async ngOnInit(): Promise<void> {
    const response = await this.getUser();
    if (response) {
      this.user = response;
      this._id = response._id;
      this.nbUC = response.nbUC;

      this.status = await this.getStatus(this.user.status);

      if(this.status.name == "admin") {
        this.isAdmin = true;
      }

      let subscriptions = await this.getSubscriptions();
      subscriptions.forEach(async (e: any) => {
        let education = await this.getEducation(e.id_education);
        e.education = education;
        this.subscriptions.push(e);

        this.totalUC += (e.grCM * this.status.heureCM) + (e.grTD * this.status.heureTD) + (e.grTP * this.status.heureTP);
      });


      let educations = await this.getAllEducations();

      educations.forEach(async (e: any) => {
        let subscriptions = await this.getSubscriptionsForEducation(e._id);

        if(subscriptions.length == 0) {
          this.educations.push(e);
        }
      });
    }
  }

  async getUser() {
    const token = localStorage.getItem('token') ?? '';
    let res = await fetch('http://localhost:5000/api/auth/me', {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    });
    const response = await res.json();
    let _id = response.teacher.teacher._id;

    if (response.success) {
      res = await fetch('http://localhost:5000/api/teachers/' + _id);
      return res.json();
    }
    return false;
  }

  // get subscriptions for user id
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

  // get subscriptions for education id
  async getSubscriptionsForEducation(_id: any) {
    const token = localStorage.getItem('token') ?? '';
    let res = await fetch('http://localhost:5000/api/subscriptions/education/' + _id, {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    });
    const response = await res.json();
    return response;
  }

  // get education
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

  // get status
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

  // get all educations
  async getAllEducations() {
    const token = localStorage.getItem('token') ?? '';
    let res = await fetch('http://localhost:5000/api/educations', {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    });
    const response = await res.json();
    return response;
  }
}