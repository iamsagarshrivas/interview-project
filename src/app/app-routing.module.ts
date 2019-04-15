import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInterviewerComponent } from './admin/add-interviewer/add-interviewer.component';
import { ScheduleInterviewComponent } from './admin/schedule-interview/schedule-interview.component';
import { ViewStatusComponent } from './admin/view-status/view-status.component';
import { UploadResumeComponent } from './candidate/upload-resume/upload-resume.component';
import { ViewDataComponent } from './interviewer/view-data/view-data.component';
import { DefaultComponent } from './admin/default/default.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PostJobComponent } from './admin/post-job/post-job.component';
import { ViewPostedJobsComponent } from './admin/view-posted-jobs/view-posted-jobs.component';
import { CandidateDashboardComponent } from './candidate/candidate-dashboard/candidate-dashboard.component';
import { ViewJobsComponent } from './candidate/candidate-dashboard/view-jobs/view-jobs.component';
import { ViewCandidateStatusComponent } from './candidate/candidate-dashboard/view-candidate-status/view-candidate-status.component';
import { DashboardComponent } from './interviewer/dashboard/dashboard.component';
import { LoginGuard } from './login.guard';
import { SchedulesComponent } from './interviewer/schedules/schedules.component';
import { 
  RoleGuardService as RoleGuard 
} from './role-guard.service';
import { AddQuesComponent } from './admin/add-ques/add-ques.component';
import { TestGenerateComponent } from './admin/test-generate/test-generate.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPageComponent, canActivate:[LoginGuard]
  },
  {
    path: 'candidate-dashboard', component: CandidateDashboardComponent,canActivate:[RoleGuard],data:{expectedRole:'candidate'},
    children: [
      { path: '', redirectTo: 'view-jobs', pathMatch: 'full' },
      { path: 'view-jobs', component: ViewJobsComponent },
      { path: 'view-status', component: ViewCandidateStatusComponent }
    ]
  },
  {
    path: 'candidate-upload-resume', component: UploadResumeComponent
  },
  {
    path: 'interviewer-panel', component: DashboardComponent, canActivate: [RoleGuard],data:{expectedRole:'interviewer'},
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component : SchedulesComponent },
      { path: 'view-details', component: ViewDataComponent }
    ]
  },
  {
    path: 'default-admin', component: DefaultComponent, canActivate: [RoleGuard],data:{expectedRole:'admin'},

    children: [
      {
        path: '', redirectTo: 'add-interviewer', pathMatch: 'full'
      },
      {
        path: "add-interviewer", component: AddInterviewerComponent
      },
      {
        path: "schedule-interview", component: ScheduleInterviewComponent
      },
      {
        path: "view-status", component: ViewStatusComponent
      },
      {
        path: "post-job", component: PostJobComponent
      },
      {
        path: "view-posted-jobs", component: ViewPostedJobsComponent
      },
      {
        path: "add-question",component:AddQuesComponent
      },
      {
        path: "test-generator",component:TestGenerateComponent
      }
    ]
    
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full', canActivate:[]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
