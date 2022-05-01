import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.css']
})
export class EducationsComponent implements OnInit {

  waiting = true;
  user: any = null;
  educationList = [];
  subscribedList: any = [];
  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    // get education list from localhost:5000/api/educations
    this.user = await this.getUser();
    this.educationList = await getEducationList();
    this.waiting = false;
    let temp = await this.getSubscribedList();
    this.subscribedList = temp.subscribed;
    console.log(this.subscribedList);
  }

  onSelect(_id: string) {
    this.router.navigate(['/education', _id]);
  }

  // subcribed to the event
  async subscribe(id: any) {
    if (!this.isInList(id)) {
      await fetch('http://localhost:5000/api/teachers/subscribe/' + this.user._id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id
        })
      });
      window.location.reload();
    }
    else{
      alert('You are already subscribed to this event');
    }
  }

  // async unsubscribe(_id: any) {
  //   await fetch('http://localhost:5000/api/teachers/unsubscribe/' + _id, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   });
  //   window.location.reload();
  // }

  async getSubscribedList() {
    let response = await fetch('http://localhost:5000/api/teachers/' + this.user._id);
    return await response.json();
  }

  isInList(_id: any) {
    return this.subscribedList.indexOf(_id) > -1;
  }

  async getUser() {
    const token = localStorage.getItem('token') ?? '';
    let user = await fetch('http://localhost:5000/api/auth/me', {
      headers: new Headers({
        'Authorization': 'Basic ' + token,
      })
    }).then(async res => {
      let data = await res.json();
      if (data.success) {
        let _id = data.teacher.teacher._id;
        let response = await fetch('http://localhost:5000/api/teachers/' + _id);
        var user = await response.json();
      }
      return user;
    });

    return user;
  }
}

// function async get education list from localhost:5000/api/educations
async function getEducationList() {
  const res = await fetch('http://localhost:5000/api/educations');
  const educationList = await res.json();
  return educationList;
}