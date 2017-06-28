import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SchoolService } from '../../services/school.service';
import { DegreeService } from '../../services/degree.service';
import { MarkService } from '../../services/mark.service';
import { Router } from '@angular/router';
import { School } from '../user-degree/school';
import { Degree } from '../user-mark/degree';
import { Mark } from '../user-mark/mark';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users = new Array<User>();
  admin = new Array<User>();
  staff = new Array<User>();
  en_users = new Array<User>();
  di_users = new Array<User>();
  schools = new Array<School>();
  degrees = new Array<Degree>();
  marks = new Array<Mark>();

  //variables for loading spinner controller
  isLoading_school = true;
  isLoading_degree = true;
  isLoading_mark = true;
  isLoading_user = true;

  //variables for counting
  school_count = 0;
  degree_count = 0;
  mark_count = 0;

  admin_user_count = 0;
  staff_user_count = 0;
  en_user_count = 0;
  di_user_count = 0;

  //for ADMIN
  isAdmin = false;

  //user data variables
  _id = new String;
  _username = new String;
  _name = new String;
  _dob = new String;
  _email = new String;
  _phone = new String;
  _type = new String;

  constructor(private schoolService: SchoolService,
    private degreeService: DegreeService,
    private markService: MarkService,
    private userService: UserService,
    private router: Router) {
    var data = JSON.parse(localStorage.getItem('user'));
    this._id = data.id;
    this._username = data.username;
    this._name = data.name;
    this._dob = data.dob;
    this._email = data.email;
    this._phone = data.phone;
    this._type = data.type;
  }

  ngOnInit() {
    this.userService.validateAdmin(JSON.parse(localStorage.getItem('user')).id)
      .subscribe(data => {
        if (data.success) {
          this.isAdmin = true;
          //get schools
          this.schoolService.getSchools()
            .subscribe(data => {
              this.schools = data.schools;
              this.isLoading_degree = false;
              if (this.schools.length != 0) {
                this.school_count = this.schools.length;
              }
            });

          //get degrees
          this.degreeService.getDegrees()
            .subscribe(data => {
              this.degrees = data.degrees;
              this.isLoading_school = false;
              if (this.degrees.length != 0) {
                this.degree_count = this.degrees.length;
              }
            });

          //get degrees
          this.markService.getMarks()
            .subscribe(data => {
              this.marks = data.marks;
              this.isLoading_mark = false;
              if (this.marks.length != 0) {
                this.mark_count = this.marks.length;
              }
            });

          //get users
          this.userService.getUsers()
            .subscribe(data => {
              this.users = data.users;
              this.isLoading_user = false;
              if (this.users.length != 0) {
                for (var i = 0; i < this.users.length; i++) {
                  var temp = this.users[i];
                  if (temp.type == 'admin' && !temp.isDisable) {
                    this.admin.push(temp);
                  } else {
                    if (temp.type == 'staff' && !temp.isDisable) {
                      this.staff.push(temp);
                    }
                    else {
                      if (temp.isDisable) {
                        this.di_users.push(temp);
                      } else {
                        this.en_users.push(temp);
                      }
                    }
                  }
                }
              }
              this.admin_user_count = this.admin.length;
              this.staff_user_count = this.staff.length;
              this.en_user_count = this.en_users.length;
              this.di_user_count = this.di_users.length;
            });
        } else {
          //get schools
          this.schoolService.getSchoolsByUsername(JSON.parse(localStorage.getItem('user')).username)
            .subscribe(data => {
              this.schools = data.schools;
              this.isLoading_degree = false;
              if (this.schools.length != 0) {
                this.school_count = this.schools.length;
              }
            });

          //get degrees
          this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('user')).username)
            .subscribe(data => {
              this.degrees = data.degrees;
              this.isLoading_school = false;
              if (this.degrees.length != 0) {
                this.degree_count = this.degrees.length;
              }
            });

          //get marks
          this.markService.getMarksByUsername(JSON.parse(localStorage.getItem('user')).username)
            .subscribe(data => {
              this.marks = data.marks;
              this.isLoading_mark = false;
              if (this.marks.length != 0) {
                this.mark_count = this.marks.length;
              }
            });
        }
      })
  }
}
