import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/data-provider.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {

  jobList: any;
  
  candidate_id: string;
  user: string;
  
  scheduleArray: any;

  constructor(private dps: DataProviderService,private toaster :ToastrManager) { }
  ngOnInit() {

    this.dps.decodeToken(localStorage.getItem('token'))
    .subscribe((decodedToken)=>{
      this.dps.getNotAppliedPostedJobs(decodedToken._id)
      .subscribe((data) => {
        this.jobList = data.result;
        console.log(this.jobList);
      });
    })    
  }

  applyJob(job) {

    this.dps.addSchedule(this.candidate_id, job._id)
      .subscribe((data) => {
        console.log(data);
        this.toaster.successToastr('You applied for this job successfylly. Visit Status panel to view your status.','Applied')
        this.ngOnInit();
      })
  }

}
