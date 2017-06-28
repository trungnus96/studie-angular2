import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-admin-user-mgmt-permission',
  templateUrl: './admin-user-mgmt-permission.component.html',
  styleUrls: ['./admin-user-mgmt-permission.component.css']
})
export class AdminUserMgmtPermissionComponent implements OnInit {

  _id = new String;
  _username = new String;
  _type = new Boolean;
  _canUpdateProfile = new Boolean;
  _canUpdatePassword = new Boolean;
  _canStudie = new Boolean;
  active = true;

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  constructor(private userService: UserService,
    private router: Router) {
    var data = JSON.parse(localStorage.getItem('update_user'));

    this._id = data._id;
    this._username = data.username;
    this._type = data.type;
    this._canUpdateProfile = data.canUpdateProfile;
    this._canUpdatePassword = data.canUpdatePassword;
    this._canStudie = data.canStudie;
  }

  ngOnInit() {
  }

  updatePermissionSubmit() {
    const data = {
      type: this._type,
      canUpdateProfile: this._canUpdateProfile,
      canUpdatePassword: this._canUpdatePassword,
      canStudie: this._canStudie
    };

    //Update profile
    $("#myModal1").modal("show");
    this.userService.updatePermission(data, this._id)
      .subscribe(data => {
        if (data.success) {
          $("#myModal1").modal("show");
          this.modal_msg = "Updated successfully";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          this.updateLocalStorage();
          setTimeout(() => {
            $("#myModal1").modal("hide");
            this.active = false;
            setTimeout(() => {
              this.active = true, 0;
            });
          }, 1000);
        } else {
          $("#myModal1").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => $("#myModal1").modal("hide"), 1000);
        }
      })
  }

  //update local storage after updated
  updateLocalStorage() {
    var data = JSON.parse(localStorage.getItem('update_user'));

    data.type = this._type;
    data.canUpdateProfile = this._canUpdateProfile;
    data.canUpdatePassword = this._canUpdatePassword;
    data.canStudie = this._canStudie;

    localStorage.setItem('update_user', JSON.stringify(data));
  }
}
