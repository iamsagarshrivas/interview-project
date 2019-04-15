import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { ViewStatusComponent } from './view-status/view-status.component';
import { AddInterviewerComponent } from './add-interviewer/add-interviewer.component';
import { DefaultComponent } from './default/default.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostJobComponent } from './post-job/post-job.component';
import { ViewPostedJobsComponent } from './view-posted-jobs/view-posted-jobs.component';
import { AddQuesComponent } from './add-ques/add-ques.component';
import { TestGenerateComponent } from './test-generate/test-generate.component';

@NgModule({
  declarations: [
    ScheduleInterviewComponent,
    ViewStatusComponent,
    AddInterviewerComponent,
    DefaultComponent,
    PostJobComponent,
    ViewPostedJobsComponent,
    AddQuesComponent,
    TestGenerateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ScheduleInterviewComponent,
    ViewStatusComponent,
    AddInterviewerComponent,
    DefaultComponent,
    PostJobComponent,
    ViewPostedJobsComponent
  ]
})
export class AdminModule { }