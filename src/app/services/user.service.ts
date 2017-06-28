import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  // private url = "http://localhost:8080/users/";
  private url = "users/";

  private headers = new Headers();
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http, private router: Router) {
  }

  //get users
  getUsers() {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'users', { headers: headers })
      .map(res => res.json());
  }

  //add a new user
  registerUser(user) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'register', JSON.stringify(user), { headers: headers })
      .map(res => res.json());
  }

  //validate password and username when login
  authenticateAndLogin(user) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'authenticate', JSON.stringify(user), { headers: headers })
      .map(res => res.json());
  }

  //update profile
  updateProfile(user, id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'updateProfile/' + id, JSON.stringify(user), { headers: headers })
      .map(res => res.json());
  }

  //update password
  updatePassword(user, id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'updatePassword/' + id, JSON.stringify(user), { headers: headers })
      .map(res => res.json());
  }


  //======= ADMIN ============================================================================================================
  //==========================================================================================================================

  //update password by ADMIN
  updatePasswordByAdmin(user, id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'updatePassword-by-admin/' + id, JSON.stringify(user), { headers: headers })
      .map(res => res.json());
  }

  //update profile by ADMIN
  updateProfileByAdmin(user, id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'updateProfile-by-admin/' + id, JSON.stringify(user), { headers: headers })
      .map(res => res.json());
  }

  //enable Or Disable User
  enableOrDisableUser(data, id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'enable-or-disable-user/' + id, JSON.stringify(data), { headers: headers })
      .map(res => res.json());
  }

  //delete user by user_id
  deleteUser(user_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + 'deleteUser/' + user_id, { headers: headers })
      .map(res => res.json());
  }

  //validate if user is admin
  validateAdmin(user_id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'validateAdmin/', { id: user_id }, { headers: headers })
      .map(res => res.json());
  }

  //update permission
  updatePermission(user, id) {
    const headers = new Headers();
    headers.append('Authorization', this.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'updatePermission/' + id, JSON.stringify(user), { headers: headers })
      .map(res => res.json());
  }

  //send email
  sendEmail(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'sendEmail/', JSON.stringify(data), { headers: headers })
      .map(res => res.json());
  }

  //======= ADMIN END ========================================================================================================
  //==========================================================================================================================

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // this.authToken = token;
    // this.user = user;
  }

  logout() {
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  isAdmin() {
    var token = localStorage.getItem('id_token');
    return (this.jwtHelper.decodeToken(token)._doc.type == 'admin')
  }

  isHomePage() {
    return (this.router.url == '/');
  }
}
