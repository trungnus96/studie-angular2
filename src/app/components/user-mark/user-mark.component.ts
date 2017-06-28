import { Component, OnInit } from '@angular/core';
import { MarkService } from '../../services/mark.service';
import { DegreeService } from '../../services/degree.service';
import { Degree } from './degree';
import { Router } from '@angular/router';
import { AcademicOverviewComponent } from '../academic-overview/academic-overview.component';
declare var $: any;

@Component({
  selector: 'app-user-mark',
  templateUrl: './user-mark.component.html',
  styleUrls: ['./user-mark.component.css']
})
export class UserMarkComponent implements OnInit {

  degrees = new Array<Degree>();

  //variables for loading spinner controller
  isLoading = true;

  _subject_name = new String;
  _subject_code = new String;
  _semester: Number;
  _year_level: Number;
  _mark: Number;

  active = true; //for clear the form

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  constructor(private markService: MarkService,
    private degreeService: DegreeService,
    private router: Router) {
    if (localStorage.getItem('update_user')) {
      //for admin / staff add marks for user
      if (localStorage.getItem('update_user_degree')) {
        this.degrees.push(JSON.parse(localStorage.getItem('update_user_degree')));
        this.isLoading = false;
      } else {
        this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('update_user')).username)
          .subscribe(data => {
            this.degrees = data.degrees;
            this.isLoading = false;
          });
      }
    }
    else {
      if (localStorage.getItem('degree_on_result')) {
        this.degrees.push(JSON.parse(localStorage.getItem('degree_on_result')));
        this.isLoading = false;
      } else {
        this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('user')).username)
          .subscribe(data => {
            this.degrees = data.degrees;
            this.isLoading = false;
          });
      }
    }
  }

  ngOnInit() {
  }

  addMarkSubmit() {
    var degree_id = $("input[type='radio'][name='degree']:checked").val();
    if (!degree_id) {
      return alert('please select shit')
    }
    this.modal_msg_controller = false;
    const mark = {
      subject_name: this._subject_name,
      subject_code: this._subject_code,
      semester: this._semester,
      year_level: this._year_level,
      mark: this._mark,
      degree_id: degree_id,
      school_id: this.degrees.find(temp => temp._id == degree_id).school_id,
      username: JSON.parse(localStorage.getItem('user')).username
    };

    //Add mark
    $("#add-mark-modal").modal("show");
    this.markService.addMark(mark)
      .subscribe(data => {
        if (data.success) {
          $("#add-mark-modal").modal("show");
          this.modal_msg = "Added successfully";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          setTimeout(() => this.modal_msg = "Reload... ", 1000);
          setTimeout(() => {
            $("#add-mark-modal").modal("hide");
            AcademicOverviewComponent.reload();
          }, 1500);
        } else {
          $("#add-mark-modal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => { $("#add-mark-modal").modal("hide"); this.modal_msg_controller = false }, 1000);
        }
      })
  }

  clearForm() {
    this._subject_name = new String;
    this._subject_code = new String;
    this._semester = null;
    this._year_level = null;
    this._mark = null;

    this.active = false;
    setTimeout(() => {
      this.active = true, 0;
    });
  }
}
