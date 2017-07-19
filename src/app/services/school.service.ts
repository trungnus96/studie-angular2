import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SchoolService {

  private url = "https://ancient-ocean-55048.herokuapp.com/school/";
  // private url = "school/";
  private headers = new Headers();
  constructor(private http: Http) {
  }

  //get schools by username or without username
  getSchoolsByUsername(username) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'schools?username=' + username, { headers: headers })
      .map(res => res.json());
  }

  //  //get schools by school id
  //   getSchoolBySchoolId(school_id) {
  //     let headers = new Headers();
  //     headers.append('Content-Type', 'application/json');
  //     return this.http.get(this.url + 'school?_id=' + school_id, { headers: headers })
  //       .map(res => res.json());
  //   }

  getSchools() {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'schools', { headers: headers })
      .map(res => res.json());
  }

  //add a new school
  addSchool(school) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'add', JSON.stringify(school), { headers: headers })
      .map(res => res.json());
  }

  //update school
  updateSchool(school, school_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'updateSchool/' + school_id, JSON.stringify(school), { headers: headers })
      .map(res => res.json());
  }

  //delete school by school_id
  deleteSchool(school_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + 'deleteSchool/' + school_id, { headers: headers })
      .map(res => res.json());
  }

  getToken() {
    return localStorage.getItem('id_token');
  }
}
