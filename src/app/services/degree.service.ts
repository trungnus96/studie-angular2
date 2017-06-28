import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DegreeService {

  // private url = "http://localhost:8080/degree/";
  private url = "degree/";

  private headers = new Headers();

  constructor(private http: Http) {
  }

  getDegrees() {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'degrees', { headers: headers })
      .map(res => res.json());
  }

  //get degrees by username or without username
  getDegreesByUsername(username) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'degrees?username=' + username, { headers: headers })
      .map(res => res.json());
  }

  //add a new degree
  addDegree(degree) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'add', JSON.stringify(degree), { headers: headers })
      .map(res => res.json());
  }

  //update degree
  updateDegree(degree, degree_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'updateDegree/' + degree_id, JSON.stringify(degree), { headers: headers })
      .map(res => res.json());
  }

  //delete degree by degree_id
  deleteDegree(degree_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + 'deleteDegree/' + degree_id, { headers: headers })
      .map(res => res.json());
  }

  //delete degree by school_id
  deleteDegreeBySchoolId(school_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + 'deleteDegree?school_id=' + school_id, { headers: headers })
      .map(res => res.json());
  }

  getToken() {
    return localStorage.getItem('id_token');
  }
}
