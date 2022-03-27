import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  waiting = true;
  educationList = [];
  constructor() { }

  async ngOnInit(): Promise<void>  {
    // get education list from localhost:5000/api/educations
    this.educationList = await getEducationList();
    this.waiting = false;
  }
}


// function async get education list from localhost:5000/api/educations
async function getEducationList() {
  const res = await fetch('http://localhost:5000/api/educations');
  const educationList = await res.json();
  return educationList;
}