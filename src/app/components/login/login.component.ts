import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _username = new String;
  _password = new String;

  //variables for modal  - start
  modal_msg = "";
  modal_msg_controller = false;
  modal_msg_on_success = false;
  //variables for modal - end

  constructor(private userService: UserService,
    private router: Router) {
      if(this.userService.loggedIn()){
        this.router.navigate(['/dashboard']);
      }
     }

  ngOnInit() {
  }

  login() {
    this.modal_msg_controller = false;
    const user = {
      username: this._username,
      password: this._password
    }

    $("#myModal").modal("show");
    this.userService.authenticateAndLogin(user)
      .subscribe(data => {
        if (data.success) {
          $("#myModal").modal("show");
          localStorage.clear();
          this.userService.storeUserData(data.token, data.user);
          this.modal_msg = "Login successfully ";
          this.modal_msg_controller = true;
          this.modal_msg_on_success = true;

          setTimeout(() => this.modal_msg = "Navigating... ", 700);
          $("#myModal").modal("hide");
          this.router.navigate(['/dashboard']);
         

        } else {
          $("#myModal").modal("show");
          this.modal_msg = data.msg;
          this.modal_msg_controller = true;
          setTimeout(() => {$("#myModal").modal("hide");this.modal_msg_controller = false;}, 500);
        }
      });
    // $("#myModal").modal("show");
    // setTimeout(() => $("#myModal").modal("hide"), 3000);
  }
}
