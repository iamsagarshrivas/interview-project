import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css']
})
export class ScheduleInterviewComponent implements OnInit {

  ScheduleInterviewForm: FormGroup;
  submitted: Boolean;
  successInfo: boolean = false;
  scheduleArray: any;
  candidates: any;
  interviewers: any;
  scheduleObj: any;
  today = new Date();
  jobs = new Array();
  timeslot = [
    '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 -18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'
  ];
  interviewTypes = [
    'Telephone Interview', 'Face-to-Face Interview', 'Panel Interview', 'Group Interview', 'Sequential Interview', 'Competency Based Interviews', 'Portfolio Based Interviews', 'General Interview'
  ];
  interviewLevels = [
    'First round', 'Second Round', 'Third Round'
  ]



  constructor(private formBuilder: FormBuilder, private dsp: DataProviderService) {


  }

  get f() { return this.ScheduleInterviewForm.controls; }

  selectJob() {
    console.log('change', this.ScheduleInterviewForm.value.candidate_id);

    this.dsp.getScheduleByCandidateId(this.ScheduleInterviewForm.value.candidate_id)
      .subscribe((data) => {

        console.log(data);
        for (var i = 0; i < data.response.length; i++) {
          for (var j = 0; j < data.schedule.length; j++) {
            console.log(data.response[i]._id === data.schedule[j].job_id);
            if (data.response[i]._id === data.schedule[j].job_id) {

              console.log(data.response[i], data.schedule[j]);
              this.jobs.push(data.response[i]);
            }
          }
        }

      })



  }

  ngOnInit() {
    this.submitted = false;

    this.dsp.getCandidates()
      .subscribe((data) => {
        this.candidates = data;
        console.log(data);

      });

    this.dsp.getInterviewer()
      .subscribe((data) => {
        this.interviewers = data;
        console.log(data);
      })



    this.ScheduleInterviewForm = this.formBuilder.group({
      job_id: [null, [Validators.required]],
      candidate_id: [null, [Validators.required]],
      interviewer_id: [null, [Validators.required]],
      scheduleDate: [null, [Validators.required]],
      scheduleTime: [null, [Validators.required]],
      interviewType: [null, [Validators.required]],
      interviewLevel: [null, [Validators.required]],
      result: [null],
      post: [null],
      dressCode: [null],
      interviewVenue: [null, [Validators.required]],
      comments: [null],
      acknowledgement: [null]
    });
  }

  onSubmit() {
    
    this.submitted = true;
    
    console.log(this.ScheduleInterviewForm.value);

    if (this.ScheduleInterviewForm.invalid) {
      return;
    }
    var date = new Date(this.ScheduleInterviewForm.value.scheduleDate);
    this.ScheduleInterviewForm.value.result = 'scheduled'
    this.ScheduleInterviewForm.value.scheduleDate = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`;
    
    var date = new Date(this.ScheduleInterviewForm.value.scheduleDate);

    this.dsp.updateSchedule(this.ScheduleInterviewForm.value)
    .subscribe((data)=>{
      console.log(data);
      if(!data.err){
        this.submitted = false;
        this.successInfo = true;
    
        this.ScheduleInterviewForm.reset();

      }
    })

  }



  goBack() {
    this.submitted = false;
  }
}
