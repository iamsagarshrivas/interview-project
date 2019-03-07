import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDataComponent } from './view-data/view-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from '../safe.pipe';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [ViewDataComponent,SafePipe, DashboardComponent, SchedulesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PdfViewerModule
  ],
  exports: [
    DashboardComponent,
    ViewDataComponent,
    SchedulesComponent
  ]
})
export class InterviewerModule { }
