import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminUserMgmtComponent } from './components/admin-user-mgmt/admin-user-mgmt.component';
import { AdminUserMgmtProfileComponent } from './components/admin-user-mgmt-profile/admin-user-mgmt-profile.component';
import { UserSchoolComponent } from './components/user-school/user-school.component';
import { UserDegreeComponent } from './components/user-degree/user-degree.component';
import { UserMarkComponent } from './components/user-mark/user-mark.component';
import { AcademicOverviewComponent } from './components/academic-overview/academic-overview.component';
import { AcademicDetailComponent } from './components/academic-detail/academic-detail.component';

//Services
import { ValidateService } from './services/validate.service';
import { UserService } from './services/user.service';
import { SchoolService } from './services/school.service';
import { DegreeService } from './services/degree.service';
import { MarkService } from './services/mark.service';
import { AuthGuard } from './services/auth-guard.service';

//Pipes
import { EnabledUsersPipe } from './pipes/enabled-users.pipe';
import { GroupDegreeBySchoolPipe } from './pipes/group-degree-by-school.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DisabledUsersPipe } from './pipes/disabled-users.pipe';
import { StudyConsoleComponent } from './components/study-console/study-console.component';
import { AdminUserMgmtAcademicComponent } from './components/admin-user-mgmt-academic/admin-user-mgmt-academic.component';
import { AdminUserMgmtAcademicDetailComponent } from './components/admin-user-mgmt-academic-detail/admin-user-mgmt-academic-detail.component';
import { AdminUserMgmtPermissionComponent } from './components/admin-user-mgmt-permission/admin-user-mgmt-permission.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent},
  { path: 'admin/user-mgmt', component: AdminUserMgmtComponent, canActivate: [AuthGuard]},
  { path: 'admin/user-mgmt/:id', component: AdminUserMgmtProfileComponent, canActivate: [AuthGuard]},
  // { path: 'user/add-school', component: UserSchoolComponent, canActivate: [AuthGuard]},
  // { path: 'user/add-degree', component: UserDegreeComponent, canActivate: [AuthGuard]},
  // { path: 'user/add-mark', component: UserMarkComponent, canActivate: [AuthGuard]},
  { path: 'study-console', component: AcademicOverviewComponent, canActivate: [AuthGuard]},
  { path: 'study-console/detail/:degre_id', component: AcademicDetailComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    ProfileComponent,
    ContactComponent,
    AdminUserMgmtComponent,
    DisabledUsersPipe,
    EnabledUsersPipe,
    AdminUserMgmtProfileComponent,
    UserSchoolComponent,
    UserDegreeComponent,
    UserMarkComponent,
    AcademicOverviewComponent,
    GroupDegreeBySchoolPipe,
    AcademicDetailComponent,
    OrderByPipe,
    StudyConsoleComponent,
    AdminUserMgmtAcademicComponent,
    AdminUserMgmtAcademicDetailComponent,
    AdminUserMgmtPermissionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, UserService, SchoolService, 
              DegreeService, MarkService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
