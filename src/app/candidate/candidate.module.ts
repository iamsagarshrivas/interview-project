import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadResumeComponent } from './upload-resume/upload-resume.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CandidateDashboardComponent } from './candidate-dashboard/candidate-dashboard.component';
import { ViewJobsComponent } from './candidate-dashboard/view-jobs/view-jobs.component';
import { ViewCandidateStatusComponent } from './candidate-dashboard/view-candidate-status/view-candidate-status.component';


@NgModule({
  declarations: [UploadResumeComponent, CandidateDashboardComponent, ViewJobsComponent,  ViewCandidateStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [UploadResumeComponent]
})
export class CandidateModule { }
