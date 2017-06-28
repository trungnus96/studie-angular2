import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  firstName = new String;
  lastName = new String;
  email = new String;
  company = new String;
  message = new String;

  active = true;
  disable_button = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  sendEmailSubmit() {
    if(this.firstName.length == 0 || this.lastName.length == 0 || this.email.length == 0 
          || this.company.length == 0 || this.message.length == 0){
            alert('please enter');
            return false;
    }

    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      company: this.company,
      message: this.message
    }
    this.disable_button = true;

    this.userService.sendEmail(data)
      .subscribe(data => {
        if (data.success) {
          this.clearForm();
          alert("success");
          this.disable_button = false;
        }
        else {
          alert('fail');
          this.disable_button = false;
        }
      })
  }

  clearForm() {
    this.firstName = new String;
    this.lastName = new String;
    this.email = new String;
    this.company = new String;
    this.message = new String;

    this.active = false;
    setTimeout(() => {
      this.active = true, 0;
    });
  }
}
