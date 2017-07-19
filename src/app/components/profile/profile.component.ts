import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  _id = new String;
  _username = new String;
  _name = new String;
  _dob = new String;
  _email = new String;
  _phone = new String;
  _type = new Boolean;

  edit_profile = false;

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  //variables for update password
  _password = new String();
  _newPassword = new String();
  _confirmNewPassword = new String();
  isPasswordMatch = true;

  constructor(private validateService: ValidateService,
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
    //initialize tooltip component
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  editProfile() {
    this.edit_profile = true;
  }

  updateProfile() {
    const data = {
      username: this._username,
      name: this._name,
      dob: this._dob,
      email: this._email,
      phone: this._phone
    };

    if (!this.validateService.validateDate(data.dob)) {
      alert('Please use a valid Date of Birth');
      return false
    }

    if (!this.validateService.validateEmail(data.email)) {
      alert('Please use a valid Email');
      return false;
    }

    if (!this.validateService.validatePhoneNumber(data.phone)) {
      alert('Please use a valid Phone Number');
      return false;
    }

    //Update profile
    $("#myModal").modal("show");
    this.userService.updateProfile(data, this._id)
      .subscribe(data => {
        if (data.success) {
          $("#myModal").modal("show");
          this.modal_msg = "Updated successfully";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          this.updateLocalStorage();
          this.edit_profile = false;
          setTimeout(() => {
            $("#myModal").modal("hide");
          }, 1000);
        } else {
          $("#myModal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => $("#myModal").modal("hide"), 1500);
        }
      })
  }

  updatePassword() {
    this.isPasswordMatch = (this._newPassword == this._confirmNewPassword);

    if (!this.isPasswordMatch) {
      return false;
    }

    const data = {
      username: this._username,
      password: this._password,
      new_password: this._newPassword
    };

    //Update password
    $("#myModal").modal("show");
    this.userService.updatePassword(data, this._id)
      .subscribe(data => {
        if (data.success) {
          this.modal_msg = "Updated successfully";
          $("#myModal").modal("show");
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          this.updateLocalStorage();
          this.edit_profile = false;
          setTimeout(() => {
            this.modal_msg = "Reload...";
          }, 300);
          setTimeout(() => {
            $("#myModal").modal("hide");
            location.reload();
          }, 500);
        } else {
          $("#myModal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 1500);
        }
      });

  }

  disableEdit() {
    this.edit_profile = false;
  }

  //update local storage after updated
  updateLocalStorage() {
    var data = JSON.parse(localStorage.getItem('user'));
    data.name = this._name;
    data.dob = this._dob;
    data.email = this._email;
    data.phone = this._phone;
    localStorage.setItem('user', JSON.stringify(data));
  }
}
