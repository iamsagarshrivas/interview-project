import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/data-provider.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  interviewer: any;
  schedules: any;
  candidate: any;
  showDetail:Boolean=false;
  candidate_id:any = null;
  openResumeFile:Boolean=false;
  openVideoFile:Boolean=false;
  statusDiv:Boolean=false;
  statusUpdateForm: FormGroup;
  resumeSrc :String=null;
  videoSrc : String=null

  constructor(private dps: DataProviderService,
    private router:Router,
    private http:HttpClient,
    private formBuilder : FormBuilder
    ) { }

  ngOnInit() {

    this.dps.getInterviewerById(localStorage.getItem('interviewer_id'))
      .subscribe((data) => {
        console.log(data);
        this.interviewer = data;

      });

    this.dps.getScheduleByInterviewerId(localStorage.getItem('interviewer_id'))
      .subscribe((data) => {
        console.log(data);
        this.schedules = data.response;
      });
    }

    openCandidateProfile(id){
      console.log(id);
      this.dps.getCandidateById(id)
      .subscribe((data)=>{
        console.log(data);
        this.candidate = data.candidate;
        console.log('cc',this.candidate);
        this.candidate_id = id;
        this.showDetail=true;
        
      })
      
    }


  openResume(){
    console.log('resume',this.candidate_id);
    this.openResumeFile = true;
    this.openVideoFile = false;
    this.statusDiv =false;
    this.resumeSrc = 'http://localhost:3000/api/get-file/'+this.candidate.uploadDocuments.resumeFile;
  }
  openVideo(){
    console.log('video');
    this.openResumeFile = false;
    this.openVideoFile = true;
    this.statusDiv = false;
    this.videoSrc = 'http://localhost:3000/api/get-file/'+this.candidate.uploadDocuments.videoResumeFile;
    
  }
  updateStatus(){
    this.openResumeFile = false;
    this.openVideoFile = false;
    this.statusDiv = true;
    this.statusUpdateForm = this.formBuilder.group({
      result:[null],
      comment:[null]
    })
  }

  goBack(){
  this.showDetail = !this.showDetail
  this.resumeSrc = null;
  this.videoSrc = null;
  this.candidate = null;
  }

  updateResult(){
    this.dps.updateCandidateResult(this.candidate_id,this.statusUpdateForm.value)
    .subscribe((data)=>{
      console.log(data);
      if(data.success){
        alert(data.msg)
      }
      else{
        alert(data.err);
      }
      
    })
    

  }

}
