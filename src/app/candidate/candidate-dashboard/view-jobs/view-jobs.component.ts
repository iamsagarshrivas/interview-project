import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {

  jobList : any;
  token : string;
  candidate_id:string;
  user:string;
  userName:string;
  scheduleArray:any;

  constructor(private dps:DataProviderService) { }

  ngOnInit() {

    this.token = localStorage.getItem('token');
    this.candidate_id = localStorage.getItem('candidate_id');
    if(this.candidate_id){
       this.dps.getCandidateById(this.candidate_id)
       .subscribe((data)=>{
         this.user = data;
         this.userName=data.candidate.basicInfo.candidateName;
         
       })
    }

    this.dps.getPostedJobs()
      .subscribe((data) => {
        this.jobList = data;
        this.jobList.forEach(function(element) { element.alreadyApplied = "false"; });

        console.log(this.jobList);
      });
  }

  applyJob(job_id){
   
    if(this.token==null){
      // 1. save jobId in local storage
      localStorage.setItem('job_id',job_id);

      // 2. login user

      // 3. if not login then register user

      // 4. get jobId from localStorage and apply for job
    }
    else{
      this.dps.addSchedule(this.candidate_id,job_id)
      .subscribe((data)=>{
        console.log(data);
        alert('applied successfully')
        
      })
    }
  }

}
