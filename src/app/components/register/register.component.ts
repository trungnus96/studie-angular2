import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {AdminUserMgmtComponent} from'../admin-user-mgmt/admin-user-mgmt.component';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  _username = new String;
  _name = new String;
  _huname = new String;
  _dob = new String;
  _email = new String;
  _password = new String;
  _phone = new String;
  _type: string;
  _isDisable = false;
  _option = "member";

  active = true; //for clear the form

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  _confirmNewPassword = new String();
  isPasswordMatch = true;

  constructor(private validateService: ValidateService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    //initialize tooltip component
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  registerUserSubmit() {
    this.modal_msg_controller = false;
    const user = {
      username: this._username,
      name: this._name,
      dob: this._dob,
      email: this._email,
      password: this._password,
      phone: this._phone,
      type: this._option,
      isDisable: this._isDisable
    };

    if (!this.validateService.validateDate(user.dob)) {
      alert('Please use a valid Date of Birth');
      return false
    }

    if (!this.validateService.validateEmail(user.email)) {
      alert('Please use a valid Email');
      return false;
    }

    if (!this.validateService.validatePhoneNumber(user.phone)) {
      alert('Please use a valid Phone Number');
      return false;
    }

    this.isPasswordMatch = (this._password == this._confirmNewPassword);

    if (!this.isPasswordMatch) {
      return false;
    }

    //Regiser user
    $("#register-modal").modal("show");
    this.userService.registerUser(user)
      .subscribe(data => {
        if (data.success) {
          $("#register-modal").modal("show");
          this.modal_msg = "Registered successfully";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          setTimeout(() => this.modal_msg = "Navigating... ", 1000);
          setTimeout(() => {
            $("#register-modal").modal("hide");
            AdminUserMgmtComponent.reload();
          }, 1500);
        } else {
          $("#register-modal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => {$("#register-modal").modal("hide"); this.modal_msg_controller = false}, 1500);
        }
      })
  }

  clearForm() {
    this._username = new String;
    this._name = new String;
    this._huname = new String;
    this._dob = new String;
    this._email = new String;
    this._password = new String;
    this._phone = new String;
    this._isDisable = false;
    this._option = "member";

    this.active = false;
    setTimeout(() => {
      this.active = true, 0;
      //initialize tooltip component
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    });
  }
}
