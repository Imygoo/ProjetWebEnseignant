import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = null;
  _id = "";
  show_firstname = "";
  show_lastname = "";
  firstname = "";
  lastname = "";
  maxHours = 0;
  status = "";
  password = "";
  email = "";

  constructor() { }

  async ngOnInit(): Promise<void> {
    const response = await getUser();
    if (response) {
      this.user = response;
      this._id = response._id;
      this.show_firstname = response.firstname;
      this.show_lastname = response.lastname;
      this.firstname = response.firstname;
      this.lastname = response.lastname;
      this.maxHours = response.maxHours;
      this.status = response.status;
      this.password = response.password;
      this.email = response.email;
    }
  }

  async save() {
    const token = localStorage.getItem('token') ?? '';
    if (this.firstname != '' && this.lastname != '' && this.maxHours != 0 && this.password != '') {

      const res = await fetch('http://localhost:5000/api/teachers/' + this._id, {
        method: 'PUT',
        headers: new Headers({
          'Authorization': 'Basic ' + token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          firstname: this.firstname,
          lastname: this.lastname,
          maxHours: this.maxHours,
          password: this.password
        })
      });
      
      window.location.reload();
    } else {
      alert("Veuillez remplir tous les champs");
    }
  }
}

async function getUser() {
  const token = localStorage.getItem('token') ?? '';
  let res = await fetch('http://localhost:5000/api/auth/me', {
    headers: new Headers({
      'Authorization': 'Basic ' + token,
    })
  });
  const response = await res.json();
  let _id = response.teacher.teacher._id;

  if(response.success) {
    res = await fetch('http://localhost:5000/api/teachers/' + _id);
    return res.json();
  }
  return false;
}
