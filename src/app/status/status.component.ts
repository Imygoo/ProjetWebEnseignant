import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  _id = "";
  name = "";
  heureTD = 0;
  heureTP = 0;
  heureCM = 0;
  waiting = true;

  async ngOnInit(): Promise<void> {
    let id = this.route.snapshot.paramMap.get('id');
    let response = await this.getStatus(id);
    this._id = response._id;
    this.name = response.name;
    this.heureTD = response.heureTD;
    this.heureTP = response.heureTP;
    this.heureCM = response.heureCM;
    this.waiting = false;
  }

  // get status
  async getStatus(id: any) {
    const res = await fetch('http://localhost:5000/api/status/' + id);
    const status = await res.json();
    return status;
  }

  // update status 
  async save() {
    const token = localStorage.getItem('token') ?? '';
    if (this.name != '') {
      const res = await fetch('http://localhost:5000/api/status/' + this._id, {
        method: 'PUT',
        headers: new Headers({
          'Authorization': 'Basic ' + token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          name: this.name,
          heureTD: this.heureTD,
          heureTP: this.heureTP,
          heureCM: this.heureCM
        })
      });
      const response = await res.json();
      window.history.back();
    }
  }

  async back() {
    window.history.back();
  }
}
