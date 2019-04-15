import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-view-candidate-status',
  templateUrl: './view-candidate-status.component.html',
  styleUrls: ['./view-candidate-status.component.css']
})
export class ViewCandidateStatusComponent implements OnInit {

  scheduleArray=new Array();
  filteredScheduleArray=new Array();
  
  modalData :any;
  private _searchString : String;

  get searchString() : String{
    return this._searchString;
  }
  set searchString(value :  String){
    this._searchString = value;
    this.filteredScheduleArray = this.filterSchedule(value);
  }

  filterSchedule(searchTerm : String){
    return this.scheduleArray.filter(
      (schedule)=> schedule.job_id.jobTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      
    );
  }

  constructor(private dps: DataProviderService) { }

  ngOnInit() {
    if(localStorage.getItem('token')){

    this.dps.decodeToken(localStorage.getItem('token'))
    .subscribe((decodedData)=>{
      this.dps.getScheduleByCandidateId(decodedData._id)
      .subscribe((data)=>{
        console.log('job data',data);
        this.filteredScheduleArray= this.scheduleArray=data.response;
        this.modalData = this.scheduleArray[0];
      })
      
    })  
  }
  else{
    
  } 

    
  }


  printRow(event){
    
    console.log(event);
    this.modalData = event
    
  }
}
