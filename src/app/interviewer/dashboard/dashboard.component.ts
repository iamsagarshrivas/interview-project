import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private dps:DataProviderService) { }

  schedules:any;
  interviewer : any;

  ngOnInit() {

    this.dps.getInterviewerById(localStorage.getItem('interviewer_id'))
    .subscribe((data)=>{
      this.interviewer = data;
      
    })



  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem("interviewer_id");
    this.router.navigate(['/login']);
  }

}
