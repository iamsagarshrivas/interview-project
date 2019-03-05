import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-view-candidate-status',
  templateUrl: './view-candidate-status.component.html',
  styleUrls: ['./view-candidate-status.component.css']
})
export class ViewCandidateStatusComponent implements OnInit {

  userName :string;
  scheduleArray=new Array();

  constructor(private dps: DataProviderService) { }

  ngOnInit() {
    this.dps.getCandidateById(localStorage.getItem('candidate_id'))
    .subscribe((data)=>{
      console.log(data.candidate.jobId);
      this.userName = data.candidate.basicInfo.candidateName;
      
    })

    this.dps.getScheduleByCandidateId(localStorage.getItem('candidate_id'))
    .subscribe((data)=>{
      console.log(data);
      for(var i=0;i<data.response.length;i++){
        for(var j=0;j<data.schedule.length;j++){
          if(data.response[i]._id === data.schedule[j].job_id){
            data.response[i].result = data.schedule[j].result;
            this.scheduleArray.push(data.response[i]);
          }
        }
      }
      console.log('arr',this.scheduleArray);
      
    })
    
  }


  printRow($event){
    
    this.dps.getScheduleByJobId(localStorage.getItem('candidate_id'),$event._id)
    .subscribe((data)=>{
      if(!data.err){
        console.log(data.result);
        
      }
      
    })
    
  }
}
