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
  AddInterViewerForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder, private dps: DataProviderService) { }

  get f() { return this.AddInterViewerForm.controls; }

  ngOnInit() {

    this.AddInterViewerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],// Validators.pattern("^[\\p{L} .'-]+$")]],
      email: [null, [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)]],
      role:[null,[Validators.required]],
      mobileNumber:[null,[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
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
        alert('data saved successfully')
        this.submitted=false;
        this.AddInterViewerForm.reset();
      }
    });

  }

}
