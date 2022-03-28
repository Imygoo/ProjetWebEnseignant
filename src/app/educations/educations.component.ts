import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.css']
})
export class EducationsComponent implements OnInit {

  waiting = true;
  educationList = [];
  constructor(private router: Router) { }

  async ngOnInit(): Promise<void>  {
    // get education list from localhost:5000/api/educations
    this.educationList = await getEducationList();
    this.waiting = false;
  }

  onSelect(_id: string) {
    this.router.navigate(['/education', _id]);
  }
}

// function async get education list from localhost:5000/api/educations
async function getEducationList() {
  const res = await fetch('http://localhost:5000/api/educations');
  const educationList = await res.json();
  return educationList;
}