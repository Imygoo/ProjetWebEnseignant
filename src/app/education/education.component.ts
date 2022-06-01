import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  isAdmin = false;
  waiting = true;
  education: any = null;
  teachers: any = [];
  subscribedList: any = [];
  constructor(private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.verifAdmin();

    let id = this.route.snapshot.paramMap.get('id');
    this.education = await getEducation(id);
    this.teachers = await getTeachers();
    let temp = await this.getSubscribedList();

    temp.forEach((element: any) => {
      this.subscribedList.push(element.id_user);
    });

    this.waiting = false;
  }

  async back() {
    window.history.back();
  }

  isInList(_id: any) {
    return this.subscribedList.indexOf(_id) > -1;
  }

  async getSubscribedList() {
    let response = await fetch('http://localhost:5000/api/subscriptions/education/' + this.education._id);
    let data = await response.json();
    return data;
  }

  subscribe(id_user: any, id_education: any) {
    window.location.href = '/education-subscribe-admin/' + id_user + '/' + id_education;
  }

  async unsubscribe(id_user: any, id_education: any) {
    let response = await fetch('http://localhost:5000/api/subscriptions/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_education: id_education,
        id_user: id_user
      })
    });

    window.location.reload();
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
}


// function async get education list from localhost:5000/api/educations
async function getEducation(id: any) {
  const res = await fetch(`http://localhost:5000/api/educations/${id}`);
  const education = await res.json();
  return education;
}

async function getTeachers() {
  const res = await fetch(`http://localhost:5000/api/teachers`);
  const teachers = await res.json();
  return teachers;
}

