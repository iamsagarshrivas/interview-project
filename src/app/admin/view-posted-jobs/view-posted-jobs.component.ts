import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/data-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-posted-jobs',
  templateUrl: './view-posted-jobs.component.html',
  styleUrls: ['./view-posted-jobs.component.css']
})
export class ViewPostedJobsComponent implements OnInit {

  jobList: any;
  token : string;
  constructor(private dps: DataProviderService, private router: Router) { }

  ngOnInit() {


    this.dps.getPostedJobs()
      .subscribe((data) => {
        console.log(data);
        this.jobList = data;
      });

  }

  removeJob(job_id) {
    console.log(job_id);
    this.dps.removeJob(job_id)
      .subscribe((data) => {
        if (data.msg.nModified != 0) {
          this.ngOnInit();
        }
      })

  }

  editJob(job) {
    console.log(job);
    this.router.navigate(['/default-admin/post-job'], { state: job })

  }

}
