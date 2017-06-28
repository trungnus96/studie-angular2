import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { DegreeService } from '../../services/degree.service';
import { MarkService } from '../../services/mark.service';
import { Router } from '@angular/router';
import { School } from '../user-degree/school';
import { Degree } from '../user-mark/degree';
import { Mark } from '../user-mark/mark';
declare var $: any;

@Component({
  selector: 'app-academic-detail',
  templateUrl: './academic-detail.component.html',
  styleUrls: ['./academic-detail.component.css']
})
export class AcademicDetailComponent implements OnInit {

  marks: Mark[];
  school: School;
  degree: Degree;

  //variables for update-school - start
  _school_name = new String;
  _city = new String;
  _state = new String;
  _country = new String;
  //variables for update-school - end

  //variables for update-degree - start
  _degree_name = new String;
  _duration: number;
  _school_id_degree = new String;
  //variables for update-degree - end

  //variables for update-mark - start
  _mark_id: String;
  _subject_name: String;
  _subject_code: String;
  _semester: number;
  _year_level: number;
  _mark: number;
  //variables for update-mark - end

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  isLoading_mark = true;
  isMarkEmpty = true;

  constructor(private schoolService: SchoolService,
    private degreeService: DegreeService,
    private markService: MarkService,
    private router: Router) {
    this.school = JSON.parse(localStorage.getItem('school_on_result'));
    this.degree = JSON.parse(localStorage.getItem('degree_on_result'));
  }

  ngOnInit() {
    //get mark
    this.markService.getMarksByDegreeId(this.degree._id)
      .subscribe(data => {
        this.marks = data.marks;
        this.isLoading_mark = false;
        if (this.marks.length != 0) {
          this.isMarkEmpty = false;
        }
      })
  }

  updateSchool() {
    this._school_name = this.school.school_name;
    this._city = this.school.city;
    this._state = this.school.state;
    this._country = this.school.country;
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
    this.schoolService.updateSchool(data, this.school._id)
      .subscribe(data => {
        if (data.success) {
          this.modal_msg = "Updated successfully";
          $("#myModal").modal("show");
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          //update the school object
          this.school.school_name = this._school_name;
          this.school.city = this._city;
          this.school.state = this._state;
          this.school.country = this._country;
          this.updateLocalStorage();
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

  updateDegree() {
    this._degree_name = this.degree.degree_name;
    this._duration = this.degree.duration;
    this._school_id_degree = this.degree.school_id;
    $("#update-degree-modal").modal("show");
  }

  updateDegreeSubmit() {
    const data = {
      degree_name: this._degree_name,
      duration: this._duration,
      school_name: this.degree.school_name,
      school_id: this.degree.school_id
    };
    $("#update-degree-modal").modal("hide");
    $("#myModal").modal("show");
    this.degreeService.updateDegree(data, this.degree._id)
      .subscribe(data => {
        if (data.success) {
          this.modal_msg = "Updated successfully";
          $("#myModal").modal("show");
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          //update the degree object
          this.degree.degree_name = this._degree_name;
          this.degree.duration = this._duration;
          this.updateLocalStorage();
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

  updateMark(mark) {
    this._mark_id = mark._id;
    this._subject_name = mark.subject_name;
    this._subject_code = mark.subject_code;
    this._semester = mark.semester;
    this._year_level = mark.year_level;
    this._mark = mark.mark;
    $("#update-mark-modal").modal("show");
  }

  updateMarkSubmit() {
    const data = {
      subject_name: this._subject_name,
      subject_code: this._subject_code,
      semester: this._semester,
      year_level: this._year_level,
      mark: this._mark
    };
    $("#update-mark-modal").modal("hide");
    $("#myModal").modal("show");
    this.markService.updateMark(data, this._mark_id)
      .subscribe(data => {
        if (data.success) {
          this.modal_msg = "Updated successfully";
          $("#myModal").modal("show");
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          //update the mark array
          var index = this.marks.findIndex(mark => mark._id == this._mark_id);
          var temp = this.marks[index];
          temp.subject_name = this._subject_name;
          temp.subject_code = this._subject_code;
          temp.semester = this._semester;
          temp.year_level = this._year_level;
          temp.mark = this._mark;
          this.marks[index] = temp;
          //ends
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

  deleteMark(mark) {
    if (confirm("Are you sure you want to delete mark [" + mark.subject_code + "]?")) {
      $("#myModal").modal("show");
      this.markService.deleteMark(mark._id)
        .subscribe(data => {
          if (data.success) {
            this.modal_msg = data.msg;
            $("#myModal").modal("show");
            this.modal_msg_controller = true;
            this.modal_msg_on_success = true;
            setTimeout(() => {
              $("#myModal").modal("hide");
              var index = this.marks.findIndex(temp => temp._id == mark._id);
              this.marks.splice(index, 1);
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

  updateLocalStorage() {
    localStorage.removeItem('school_on_result');
    localStorage.removeItem('degree_on_result');
    localStorage.setItem('school_on_result', JSON.stringify(this.school));
    localStorage.setItem('degree_on_result', JSON.stringify(this.degree));
  }

  addMarkTab() {
    $("#addMark").modal("show");
  }
}
