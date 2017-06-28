import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  // isAdmin = false;

  constructor(private userService: UserService, private router: Router) { }

  canActivate() {
    if (this.userService.loggedIn()) {
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(['login']);
      return false;
    }
  }

  // canAccess() {
  //   this.userService.validateAdmin(JSON.parse(localStorage.getItem('user')).id)
  //     .subscribe(data => {
  //       this.isAdmin == data.success;
  //     })
  //   if (this.userService.loggedIn() && this.isAdmin) {
  //     return true;
  //   } else {
  //     localStorage.clear();
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  // }
}