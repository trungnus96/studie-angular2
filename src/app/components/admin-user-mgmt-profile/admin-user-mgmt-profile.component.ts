import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-admin-user-mgmt-profile',
  templateUrl: './admin-user-mgmt-profile.component.html',
  styleUrls: ['./admin-user-mgmt-profile.component.css']
})
export class AdminUserMgmtProfileComponent implements OnInit {

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

  static switch_to_detail = false;

  constructor(private validateService: ValidateService,
    private userService: UserService,
    private router: Router) {

    this.userService.validateAdmin(JSON.parse(localStorage.getItem('user')).id)
      .subscribe(data => {
        if (!data.success) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      })

    var data = JSON.parse(localStorage.getItem('update_user'));

    this._id = data._id;
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
    $("#myModal-aump").modal("show");
    this.userService.updateProfileByAdmin(data, this._id)
      .subscribe(data => {
        if (data.success) {
          $("#myModal-aump").modal("show");
          this.modal_msg = "Updated successfully";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          this.updateLocalStorage();
          this.edit_profile = false;

          setTimeout(() => {
            $("#myModal-aump").modal("hide");
          }, 1000);
        } else {
          $("#myModal-aump").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => { $("#myModal-aump").modal("hide"); this.modal_msg_controller = false }, 1000);
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
      new_password: this._newPassword
    };

    //Update password
    $("#myModal-aump").modal("show");
    this.userService.updatePasswordByAdmin(data, this._id)
      .subscribe(data => {
        if (data.success) {
          this.modal_msg = "Updated successfully";
          $("#myModal-aump").modal("show");
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          this.updateLocalStorage();
          this.edit_profile = false;
          setTimeout(() => {
            $("#myModal-aump").modal("hide");
            location.reload();
          }, 500);
        } else {
          $("#myModal-aump").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => { $("#myModal-aump").modal("hide"); this.modal_msg_controller = false; }, 500);
        }
      });

  }

  //update local storage after updated
  updateLocalStorage() {
    var data = JSON.parse(localStorage.getItem('update_user'));
    data.name = this._name;
    data.dob = this._dob;
    data.email = this._email;
    data.phone = this._phone;
    localStorage.setItem('update_user', JSON.stringify(data));
  }

  //back to ADMIN users management page
  back() {
    this.router.navigate(['/admin/user-mgmt']);
    localStorage.removeItem('update_user');
  }

  disableEdit() {
    this.edit_profile = false;
    if (this.getSwitchValue()) {
      AdminUserMgmtProfileComponent.switch_to_detail_value();
    }
  }

  static switch_to_detail_value() {
    this.switch_to_detail = !this.switch_to_detail;
  }

  getSwitchValue() {
    return AdminUserMgmtProfileComponent.switch_to_detail;
  }
}