import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { User } from './user'
declare var $: any;

@Component({
  selector: 'app-admin-user-mgmt',
  templateUrl: './admin-user-mgmt.component.html',
  styleUrls: ['./admin-user-mgmt.component.css']
})
export class AdminUserMgmtComponent implements OnInit {

  _username = new String();

  users = new Array<User>();

  //variables for loading spinner controller
  isLoading = true;

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  search_query = '';

  constructor(private userService: UserService,
    private router: Router) {

    //clear update_user in local storage 
    localStorage.removeItem('update_user');
    
    var data = JSON.parse(localStorage.getItem('user'));
    this._username = data.username;
    this.userService.validateAdmin(data.id)
      .subscribe(data => {
        if(!data.success){
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      })
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data.users;
        this.isLoading = false;
      });
  }

  enableOrDisableUser(_username) {
    var index = this.users.findIndex(user => user.username == _username);


    var updatedData = {
      isDisable: !this.users[index].isDisable
    };

    this.userService.enableOrDisableUser(updatedData, this.users[index]._id)
      .subscribe(data => {
        if (data.success) {
          $("#myModal").modal("show");
          this.modal_msg = "Successfully";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          setTimeout(() => {
            $("#myModal").modal("hide");
            this.modal_msg_controller = false;
            var temp = this.users[index];
            temp.isDisable = !temp.isDisable;
            this.users[index] = temp;
          }, 700);
        }
        else {
          $("#myModal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => { $("#myModal").modal("hide"); this.modal_msg_controller = false; }, 1000);
        }
      });
  }

  updateUser(user) {
    localStorage.setItem('update_user', JSON.stringify(user));
    this.router.navigate(['/admin/user-mgmt', user._id]);
  }

  deleteUser(user) {
    if (confirm("Are you sure you want to delete user [" + user.username + "]?")) {
    $("#myModal").modal("show");
    this.userService.deleteUser(user._id)
      .subscribe(data => {
        if (data.success) {
          this.modal_msg = "Deleted successfully";
          $("#myModal").modal("show");
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;
          //update the user array
          var index = this.users.findIndex(temp => temp._id == user._id);
          this.users.splice(index, 1);
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
  }

  createUserTab() {
    $("#createUser").modal("show");
  }

  static reload() {
    location.reload();
  }
}
