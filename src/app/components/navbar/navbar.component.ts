import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
  }

  displayLogoutModal() {
    $("#logoutModal").modal("show");
  }

  logout() {
    $("#logoutModal").modal("hide");
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
