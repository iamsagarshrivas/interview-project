import { Component, OnInit } from '@angular/core';
import {roles} from "../add-interviewer/role-list";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-add-interviewer',
  templateUrl: './add-interviewer.component.html',
  styleUrls: ['./add-interviewer.component.css']
})
export class AddInterviewerComponent implements OnInit {

  roles=roles;
  interviewerArray:any;

  AddInterViewerForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder, private dps: DataProviderService) { }

  get f() { return this.AddInterViewerForm.controls; }

  ngOnInit() {

    this.dps.getInterviewer()
            .subscribe(data => this.interviewerArray = data)

    this.AddInterViewerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern("^[a-z][a-z '-.,]{0,31}$|^$")]],// Validators.pattern("^[\\p{L} .'-]+$")]],
      email: [null, [Validators.required, Validators.email]],
      password:[null,[Validators.required]],//Validators.pattern("^(?=.*\d).{4,8}$")]],
      role:[null,Validators.required],
      mobileNumber:[null],
      _id:[null]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.AddInterViewerForm.invalid) {
      return;
    }

    
    console.log(this.AddInterViewerForm.value);
    
    this.dps.addInterviewer(this.AddInterViewerForm.value)
    .subscribe((data)=>{
      console.log(data);
      if(data.saved){
        this.submitted=false;
      }
    });

    this.AddInterViewerForm.reset();
  }

}
