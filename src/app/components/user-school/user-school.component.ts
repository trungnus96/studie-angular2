import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { SchoolService } from '../../services/school.service';
import { Router } from '@angular/router';
import {AcademicOverviewComponent} from '../academic-overview/academic-overview.component';
declare var $: any;

@Component({
  selector: 'app-user-school',
  templateUrl: './user-school.component.html',
  styleUrls: ['./user-school.component.css']
})
export class UserSchoolComponent implements OnInit {

  _school_name = new String;
  _city = new String;
  _state = new String;
  _country = new String;
  _username = new String;

  active = true; //for clear the form

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
  }

  addSchoolSubmit() {
    var update_user = JSON.parse(localStorage.getItem('update_user'));
    var username = JSON.parse(localStorage.getItem('user')).username;
    if(update_user){
      username = update_user.username;
    }
    this.modal_msg_controller = false;
    const school = {
      school_name: this._school_name,
      city: this._city,
      state: this._state,
      country: this._country,
      username: username
    };

    //Add school
    $("#add-school-modal").modal("show");
    this.schoolService.addSchool(school)
      .subscribe(data => {
        if (data.success) {
          $("#add-school-modal").modal("show");
          this.modal_msg = "Added successfully";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          setTimeout(() => this.modal_msg = "Reload... ", 1000);
          setTimeout(() => {
            $("#add-school-modal").modal("hide");
            AcademicOverviewComponent.reload();
          }, 1500);
        } else {
          $("#add-school-modal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => {$("#add-school-modal").modal("hide"); this.modal_msg_controller = false}, 1000);
        }
      })
  }

   clearForm() {
    this._school_name = new String;
    this._city = new String;
    this._state = new String;
    this._country = new String;

    this.active = false;
    setTimeout(() => {
      this.active = true, 0;
    });
  }
}
