import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.css']
})
export class CandidateDashboardComponent implements OnInit {

  constructor(private router:Router,private dps:DataProviderService) {

    console.log(this.router.getCurrentNavigation().extras.state);
    
    if(this.router.getCurrentNavigation().extras.state!==undefined){
      this.userName = this.router.getCurrentNavigation().extras.state.candidate.basicInfo.candidateName;
      this.userEmail =  this.router.getCurrentNavigation().extras.state.candidate.basicInfo.candidateEmail;
    }
    else{
      this.dps.decodeToken(localStorage.getItem('token'))
    .subscribe((decodedToken)=>{
      this.dps.getCandidateById(decodedToken._id)
      .subscribe((candidate)=>{
        this.userEmail = candidate.candidate.basicInfo.candidateEmail;
        this.userName = candidate.candidate.basicInfo.candidateName;      

      })
    })

    }
   }

  candidate : any;
  userName:String;
  userEmail:String;
  myModal : boolean =false;

  ngOnInit() {   

  }

  openProfileModal(){
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
