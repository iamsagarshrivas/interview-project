import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css']
})
export class ViewStatusComponent implements OnInit {

  // schedules=SCHEDULES;
  schedules:any;
  constructor(private dps:DataProviderService) { }

  ngOnInit() {
    this.dps.getSchedule()
            .subscribe(data => this.schedules=data)
  }

}
