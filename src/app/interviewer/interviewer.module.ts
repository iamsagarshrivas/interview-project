import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDataComponent } from './view-data/view-data.component';
import { AdminModule } from '../admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from '../safe.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ViewDataComponent,SafePipe],
  imports: [
    CommonModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class InterviewerModule { }
