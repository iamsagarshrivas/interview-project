import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
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
  today : string;
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

  f() { return this.ScheduleInterviewForm.controls; }

  selectJob() {
    console.log('change', this.ScheduleInterviewForm.value.candidate_id);

    this.dsp.getScheduleByCandidateId(this.ScheduleInterviewForm.value.candidate_id)
      .subscribe((data) => {

        console.log(data);
        for(var i=0;i<data.response.length;i++){          
          if(data.response[i].result === 'applied'  || data.response[i].result === 'approved'){
            this.jobs.push(data.response[i].job_id);
            if(data.response[i].result === 'approved'){
              for(var j=0;j<this.interviewers.length;j++){
                if(this.interviewers[j]._id === data.response[i].interviewer_id){
                  this.interviewers.splice(j,1);
                }
              }
            }
          }
        }
        console.log(this.jobs);      

      })



  }

  ngOnInit() {
    this.today = new Date().toISOString().substr(0,10);
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
      scheduleDate: [null, [Validators.required,this.dateValidate]],
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

  dateValidate(control : AbstractControl){
    
    if(control.value!=undefined || control.value !=null){
      if(new Date(control.value) <new Date()|| new Date(control.value).getFullYear()>2099){
        return {
          dateErr : 'Ahh!! we are not time travellers. Please enter valid date.'
        }
      }
      
    }

  }

  onSubmit() {
    console.log(this.ScheduleInterviewForm);
    
    this.submitted = true;

    if (this.ScheduleInterviewForm.invalid) {
      return;
    }

    var date = new Date(this.ScheduleInterviewForm.value.scheduleDate);
    this.ScheduleInterviewForm.value.result = 'scheduled'
    var date = new Date(this.ScheduleInterviewForm.value.scheduleDate);
    this.ScheduleInterviewForm.value.scheduleDate = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`;
    

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
