import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { DegreeService } from '../../services/degree.service';
import { School } from './school';
import { Router } from '@angular/router';
import { AcademicOverviewComponent } from '../academic-overview/academic-overview.component';
declare var $: any;

@Component({
  selector: 'app-user-degree',
  templateUrl: './user-degree.component.html',
  styleUrls: ['./user-degree.component.css']
})
export class UserDegreeComponent implements OnInit {

  _degree_name = new String;
  _duration: Number;
  schools: School[];

  //variables for loading spinner controller
  isLoading = true;

  active = true; //for clear the form

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  constructor(private schoolService: SchoolService,
    private degreeService: DegreeService,
    private router: Router) {
    var update_user = JSON.parse(localStorage.getItem('update_user'));
    var username = JSON.parse(localStorage.getItem('user')).username;
    if (update_user) {
      username = update_user.username;
    }
    this.schoolService.getSchoolsByUsername(username)
      .subscribe(data => {
        this.schools = data.schools;
        this.isLoading = false;
        // if (this.schools.length == 0) {
        //   alert('Please add school first');
        //   this.router.navigate(['/user/add-school']);
        // }
      });

  }

  ngOnInit() {
  }


  addDegreeSubmit() {
    var update_user = JSON.parse(localStorage.getItem('update_user'));
    var username = JSON.parse(localStorage.getItem('user')).username;
    if (update_user) {
      username = update_user.username;
    }
    var school_id = $("input[type='radio'][name='school']:checked").val();
    if (!school_id) {
      return alert('please select shit')
    }
    var school = this.schools.find(school => school._id == school_id);
    this.modal_msg_controller = false;
    const degree = {
      degree_name: this._degree_name,
      duration: this._duration,
      school_name: school.school_name,
      school_id: school_id,
      username: username
    };

    //Add school
    $("#add-degree-modal").modal("show");
    this.degreeService.addDegree(degree)
      .subscribe(data => {
        if (data.success) {
          $("#add-degree-modal").modal("show");
          this.modal_msg = "Added successfully";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          setTimeout(() => this.modal_msg = "Reload... ", 1000);
          setTimeout(() => {
            $("#add-degree-modal").modal("hide");
            AcademicOverviewComponent.reload();
          }, 1500);
        } else {
          $("#add-degree-modal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => { $("#add-degree-modal").modal("hide"); this.modal_msg_controller = false }, 1000);
        }
      })
  }

  clearForm() {
    this._degree_name = new String;
    this._duration = null;

    this.active = false;
    setTimeout(() => {
      this.active = true, 0;
    });
  }
}
