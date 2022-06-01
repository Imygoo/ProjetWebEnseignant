import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EducationsComponent } from './educations/educations.component';
import { EducationComponent } from './education/education.component';
import { ProfileComponent } from './profile/profile.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StatusesComponent } from './statuses/statuses.component';
import { StatusComponent } from './status/status.component';
import { EducationSubscribeComponent } from './education-subscribe/education-subscribe.component';
import { EducationSubscribeAdminComponent } from './education-subscribe-admin/education-subscribe-admin.component';
import { TeacherPostComponent } from './teacher-post/teacher-post.component';

import { AuthGuard } from './auth/auth-guard.service';
import { AdminGuard } from './auth/admin-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'educations', component: EducationsComponent, canActivate: [AuthGuard] },
  { path: 'education/:id', component: EducationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard] },
  { path: 'teacher/post', component: TeacherPostComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'teacher/:id', component: TeacherComponent, canActivate: [AuthGuard] },
  { path: 'statuses', component: StatusesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'status/:id', component: StatusComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'education-subscribe/:id', component: EducationSubscribeComponent, canActivate: [AuthGuard] },
  { path: 'education-subscribe-admin/:id_user/:id_education', component: EducationSubscribeAdminComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
