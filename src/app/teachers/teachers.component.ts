import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  isAdmin = false;
  waiting = true;
  teacherList = [];
  constructor(private router: Router) { }

  async ngOnInit(): Promise<void>  {
    this.teacherList = await getTeacherList();
    this.waiting = false;
    this.verifAdmin();
  }

  onSelect(_id: string) {
    this.router.navigate(['/teacher', _id]);
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

  async deleteTeacher(_id: string) {
    if (confirm("Voulez vous vraiment supprimer l'utilisateur ?")) {
      const res = await fetch('http://localhost:5000/api/teachers/' + _id, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + localStorage.getItem('token') ?? ''
        })
      });
      window.location.reload();
    }
  }
}

async function getTeacherList() {
  const res = await fetch('http://localhost:5000/api/teachers');
  const teacherList = await res.json();
  return teacherList;
}