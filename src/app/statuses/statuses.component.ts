import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {

  isAdmin = false;
  waiting = true;
  statusesList = [];
  constructor(private router: Router) { }

  async ngOnInit(): Promise<void>  {
    this.statusesList = await getStatusesList();
    this.waiting = false;
    this.verifAdmin();
  }

  onSelect(_id: string) {
    this.router.navigate(['/status', _id]);
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

async function getStatusesList() {
  const res = await fetch('http://localhost:5000/api/status');
  const statusesList = await res.json();
  return statusesList;
}