import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/data-provider.service';
@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  // schedules=SCHEDULES;
  schedules:any;
  candidate:any;
  id:string;
  interviewer:any;
  path:string;
  videopath:string;
  
  constructor(private router:Router,private dps:DataProviderService){
    this.interviewer=this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {

    this.path=null;
    this.videopath=null;

    // if(JSON.parse(localStorage.getItem('candidate-array'))!=null){
    //   this.candidate=JSON.parse(localStorage.getItem('candidate-array'));
    // }
    // else{
    //   this.candidate=new Array();
    // }

    this.dps.getCandidates()
            .subscribe(data => this.candidate=data)

    this.dps.getSchedule()
            .subscribe(data => this.schedules=data)
  }
  
  showResume(candid){

    for(var i=0;i<this.candidate.length;i++){
      if(this.candidate[i].email==candid.candidateEmail){
        this.path="assets/"+this.candidate[i].resumeFile; 
        this.videopath="assets/"+this.candidate[i].videoFile; 
        console.log(this.path,this.videopath);
              
        break;
      }
    }        
  }

  @ViewChild('videoPlayer') videoplayer: any;

toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
}

getResumeFile(){
  return this.path;
}
getVideoFile(){
  return this.videopath;
}

  changeStatus(){
    localStorage.setItem('schedule-array',JSON.stringify(this.schedules));  
  }


}
