import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { DegreeService } from '../../services/degree.service';
import { MarkService } from '../../services/mark.service';
import { Router } from '@angular/router';
import { School } from '../user-degree/school';
import { Degree } from '../user-mark/degree';
declare var $: any;

@Component({
  selector: 'app-academic-overview',
  templateUrl: './academic-overview.component.html',
  styleUrls: ['./academic-overview.component.css']
})
export class AcademicOverviewComponent implements OnInit {

  schools = new Array<School>();
  degrees = new Array<Degree>();

  //variables for loading spinner controller
  isLoading_school = true;
  isLoading_degree = true;

  //variables for update-school - start
  _school_id = new String;
  _school_name = new String;
  _city = new String;
  _state = new String;
  _country = new String;
  //variables for update-school - end

  //variables for update-degree - start
  _degree_id = new String;
  _degree_name = new String;
  _duration: number;
  _school_id_degree = new String;
  //variables for update-degree - end

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  isSchoolEmpty = false;
  isDegreeEmpty = false;

  disable_degree_button = true;
  disable_mark_button = true;

  constructor(private schoolService: SchoolService,
    private degreeService: DegreeService,
    private markService: MarkService,
    private router: Router) {
    localStorage.removeItem('update_user');
    localStorage.removeItem('school_on_result');
    localStorage.removeItem('degree_on_result');
  }

  ngOnInit() {
    //get schools
    this.schoolService.getSchoolsByUsername(JSON.parse(localStorage.getItem('user')).username)
      .subscribe(data => {
        this.schools = data.schools;
        this.isLoading_degree = false;
        if (this.schools.length == 0) {
          this.isSchoolEmpty = true;
        } else {
          this.disable_degree_button = false;
        }

      });

    //get degrees
    this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('user')).username)
      .subscribe(data => {
        this.degrees = data.degrees;
        this.isLoading_school = false;
        if (this.degrees.length == 0) {
          this.isDegreeEmpty = true;
        } else {
          this.disable_mark_button = false;
        }
      });
  }

  updateSchool(school) {
    this._school_id = school._id;
    this._school_name = school.school_name;
    this._city = school.city;
    this._state = school.state;
    this._country = school.country;
    $("#update-school-modal").modal("show");
  }

  updateSchoolSubmit() {
    const data = {
      school_name: this._school_name,
      city: this._city,
      state: this._state,
      country: this._country
    };
    $("#update-school-modal").modal("hide");
    $("#myModal").modal("show");
    this.schoolService.updateSchool(data, this._school_id)
      .subscribe(data => {
        if (data.success) {
          this.modal_msg = "Updated successfully";
          $("#myModal").modal("show");
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          //update the school array
          var index = this.schools.findIndex(school => school._id == this._school_id);
          var temp = this.schools[index];
          temp.school_name = this._school_name;
          temp.city = this._city;
          temp.state = this._state;
          temp.country = this._country;
          this.schools[index] = temp;
          setTimeout(() => {
            $("#myModal").modal("hide");
          }, 500);
        } else {
          $("#myModal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 500)
        }
      })
  }

  updateDegree(degree) {
    this._degree_id = degree._id;
    this._degree_name = degree.degree_name;
    this._duration = degree.duration;
    this._school_id_degree = degree.school_id;
    $("#update-degree-modal").modal("show");
  }

  updateDegreeSubmit() {
    var school_name = this.schools.find(school => school._id == this._school_id_degree).school_name;
    const data = {
      degree_name: this._degree_name,
      duration: this._duration,
      school_name: school_name,
      school_id: this._school_id_degree
    };
    $("#update-degree-modal").modal("hide");
    $("#myModal").modal("show");
    this.degreeService.updateDegree(data, this._degree_id)
      .subscribe(data => {
        if (data.success) {
          this.modal_msg = "Updated successfully";
          $("#myModal").modal("show");
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          //update the degree array
          var index = this.degrees.findIndex(degree => degree._id == this._degree_id);
          var temp = this.degrees[index];
          temp.degree_name = this._degree_name;
          temp.duration = this._duration;
          temp.school_name = school_name;
          temp.school_id = this._school_id_degree;
          this.degrees[index] = temp;
          setTimeout(() => {
            $("#myModal").modal("hide");
          }, 500);
        } else {
          $("#myModal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 500)
        }
      })
  }

  deleteDegree(degree) {
    if (confirm("Are you sure you want to delete degree [" + degree.degree_name + "]?")) {
      $("#myModal").modal("show");
      this.markService.deleteMarkByDegreeId(degree._id)
        .subscribe(data => {
          if (data.success) {
            this.modal_msg = "Deleted related marks successfully";
            $("#myModal").modal("show");
            this.modal_msg_controller = true;
            this.modal_msg_on_success = true;
            setTimeout(() => {
              $("#myModal").modal("hide");
              $("#myModal").modal("show");
              this.modal_msg_controller = false;
              this.modal_msg_on_success = false;
              this.degreeService.deleteDegree(degree._id)
                .subscribe(data => {
                  if (data.success) {
                    this.modal_msg = "Deleted degree successfully";
                    $("#myModal").modal("show");
                    this.modal_msg_controller = true;
                    this.modal_msg_on_success = true;
                    setTimeout(() => {
                      this.modal_msg = "Reload...";
                    }, 800);
                    setTimeout(() => {
                      $("#myModal").modal("hide");
                      location.reload();
                    }, 1000);
                  } else {
                    $("#myModal").modal("show");
                    this.modal_msg = data.msg;
                    this.modal_msg_controller = true;
                    setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 1000)
                  }
                })
            }, 500);
          } else {
            $("#myModal").modal("show");
            this.modal_msg = data.msg;
            this.modal_msg_controller = true;
            setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 500)
          }
        })
    }
  }

  deleteSchool(school) {
    if (confirm("Are you sure you want to delete school [" + school.school_name + "]?")) {
      //delete related marks
      $("#myModal").modal("show");
      this.markService.deleteMarkBySchoolId(school._id)
        .subscribe(data => {
          if (data.success) {
            this.modal_msg = "Deleted related marks successfully";
            $("#myModal").modal("show");
            this.modal_msg_controller = true;
            this.modal_msg_on_success = true;
            setTimeout(() => {
              //delete related degrees
              $("#myModal").modal("hide");
              $("#myModal").modal("show");
              this.modal_msg_controller = false;
              this.modal_msg_on_success = false;
              this.degreeService.deleteDegreeBySchoolId(school._id)
                .subscribe(data => {
                  if (data.success) {
                    this.modal_msg = "Deleted related degrees successfully";
                    $("#myModal").modal("show");
                    this.modal_msg_controller = true;
                    this.modal_msg_on_success = true;
                    setTimeout(() => {
                      //delete school
                      $("#myModal").modal("hide");
                      $("#myModal").modal("show");
                      this.modal_msg_controller = false;
                      this.modal_msg_on_success = false;
                      this.schoolService.deleteSchool(school._id)
                        .subscribe(data => {
                          if (data.success) {
                            this.modal_msg = "Deleted school successfully";
                            $("#myModal").modal("show");
                            this.modal_msg_controller = true;
                            this.modal_msg_on_success = true;
                            setTimeout(() => {
                              this.modal_msg = "Reload...";
                            }, 1200);
                            setTimeout(() => {
                              $("#myModal").modal("hide");
                              location.reload();
                            }, 1500);
                          } else {
                            $("#myModal").modal("show");
                            this.modal_msg = data.msg;
                            this.modal_msg_controller = true;
                            setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 1500)
                          }
                        })
                    }, 1000);
                  } else {
                    $("#myModal").modal("show");
                    this.modal_msg = data.msg;
                    this.modal_msg_controller = true;
                    setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 1000)
                  }
                })
            }, 500);
          } else {
            $("#myModal").modal("show");
            this.modal_msg = data.msg;
            this.modal_msg_controller = true;
            setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 500)
          }
        })
    }
  }

  showDetail(school, degree) {
    localStorage.setItem('school_on_result', JSON.stringify(school));
    localStorage.setItem('degree_on_result', JSON.stringify(degree));
    this.router.navigate(['/study-console/detail/' + degree._id]);
  }

  static reload() {
    location.reload();
  }

  addSchoolTab() {
    $("#addSchool").modal("show");
  }

  addDegreeTab() {
    $("#addDegree").modal("show");
  }

  addMarkTab() {
    $("#addMark").modal("show");
  }
}
