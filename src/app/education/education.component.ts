import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  waiting = true;
  education = null;
  constructor(private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void>  {
    let id = this.route.snapshot.paramMap.get('id');
    this.education = await getEducation(id);
    this.waiting = false;
  }

  async back() {
    window.history.back();
  }
}


// function async get education list from localhost:5000/api/educations
async function getEducation(id: any) {
  const res = await fetch(`http://localhost:5000/api/educations/${id}`);
  const education = await res.json();
  return education;
}