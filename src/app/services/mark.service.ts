import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MarkService {

  private url = "https://ancient-ocean-55048.herokuapp.com/mark/";
  // private url = "mark/";

  private headers = new Headers();

  constructor(private http: Http) {
  }

  getMarks() {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'marks', { headers: headers })
      .map(res => res.json());
  }

  //get marks by degree_id
  getMarksByDegreeId(degree_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'marks?degree_id=' + degree_id, { headers: headers })
      .map(res => res.json());
  }

  //get marks by user_id
  getMarksByUsername(user_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'marks?username=' + user_id, { headers: headers })
      .map(res => res.json());
  }

  //add a new mark
  addMark(mark) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'add', JSON.stringify(mark), { headers: headers })
      .map(res => res.json());
  }

  //update mark
  updateMark(mark, mark_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'updateMark/' + mark_id, JSON.stringify(mark), { headers: headers })
      .map(res => res.json());
  }

  //delete mark by mark_id
  deleteMark(mark_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + 'deleteMark/' + mark_id, { headers: headers })
      .map(res => res.json());
  }

  //delete marks by degree_id
  deleteMarkByDegreeId(degree_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + 'deleteMark?degree_id=' + degree_id, { headers: headers })
      .map(res => res.json());
  }

  //delete marks by school_id
  deleteMarkBySchoolId(school_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + 'deleteMark?school_id=' + school_id, { headers: headers })
      .map(res => res.json());
  }

  getToken() {
    return localStorage.getItem('id_token');
  }
}
