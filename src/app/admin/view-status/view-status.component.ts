import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css']
})
export class ViewStatusComponent implements OnInit {

  allStatus:any;

  constructor(private dps:DataProviderService) { }

  ngOnInit() {
    this.dps.getSchedule()
    .subscribe((data)=>{
      console.log(data);      
      this.allStatus = data;
    })
  }

}
