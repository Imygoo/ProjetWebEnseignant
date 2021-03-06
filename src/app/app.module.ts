import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EducationsComponent } from './educations/educations.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { EducationComponent } from './education/education.component';
import { ProfileComponent } from './profile/profile.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminGuard } from './auth/admin-guard.service';
import { TeacherPostComponent } from './teacher-post/teacher-post.component';
import { StatusesComponent } from './statuses/statuses.component';
import { StatusComponent } from './status/status.component';
import { EducationSubscribeComponent } from './education-subscribe/education-subscribe.component';
import { EducationSubscribeAdminComponent } from './education-subscribe-admin/education-subscribe-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EducationsComponent,
    EducationComponent,
    LoginComponent,
    ProfileComponent,
    TeachersComponent,
    TeacherComponent,
    TeacherPostComponent,
    StatusesComponent,
    StatusComponent,
    EducationSubscribeComponent,
    EducationSubscribeAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
