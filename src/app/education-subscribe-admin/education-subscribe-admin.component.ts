import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-education-subscribe-admin',
  templateUrl: './education-subscribe-admin.component.html',
  styleUrls: ['./education-subscribe-admin.component.css']
})
export class EducationSubscribeAdminComponent implements OnInit {

  waiting = true;
  education: any;
  id_user: any;

  max_grCM: any;
  max_grTD: any;
  max_grTP: any;

  grCM = 0;
  grTD = 0;
  grTP = 0;

  constructor(private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.id_user = this.route.snapshot.paramMap.get('id_user');
    let education_id = this.route.snapshot.paramMap.get('id_education');

    const response = await getEducation(education_id);

    if (response != null) {
      this.max_grCM = response.grCM;
      this.max_grTD = response.grTD;
      this.max_grTP = response.grTP;
      this.education = response;
    }

    this.waiting = false;
  }

  async back() {
    window.history.back();
  }

  async subscribe() {
    console.log(this.grCM, this.grTD, this.grTP);
    // if CM != 0, TD or TP must be 1 at least
    if (this.grCM != 0 && (this.grTD == 0 && this.grTP == 0)) {
      alert("Vous devez prendre au minimum un groupe de TP ou un groupe de TD si vous prenez un groupe de CM");
    }
    else if (this.grTD > 0 || this.grTP > 0) {
      let subscribe = {
        id_user: this.id_user,
        id_education: this.education['_id'],
        grCM: this.grCM,
        grTD: this.grTD,
        grTP: this.grTP
      }

      console.log(subscribe);

      const response = await subscribeEducation(subscribe);
      window.history.back();
    }
    else {
      alert("Aucun groupe d'indiqué pour l'inscription");
    }
  }
}

async function getEducation(id: any) {
  const res = await fetch(`http://localhost:5000/api/educations/${id}`);
  const education = await res.json();
  return education;
}

async function subscribeEducation(subscribe: any) {
  const res = await fetch(`http://localhost:5000/api/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscribe)
  });
  const response = await res.json();
  return response;
}