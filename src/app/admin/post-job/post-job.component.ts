import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataProviderService } from 'src/app/data-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  PostJobForm: FormGroup;
  posted = false;
  submitted = false;
  formData: any;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dps: DataProviderService) {
    this.formData = this.router.getCurrentNavigation().extras.state;
  }

  get f() { return this.PostJobForm.controls; }

  ngOnInit() {

    console.log(this.formData)

    if (this.formData == undefined) {

      this.PostJobForm = this.formBuilder.group({
        jobTitle: [null],
        jobType: [null],
        jobDescription: this.formBuilder.group({
          jobLocation: [null],
          jobProfile: [null],
          minQualification: [null],
          minExperience: [null],
          packageOffered: [null]
        }),
        responsibilities: [null],
        lastDayToApply: [null],
        creationDate: [null],
        creationDateMillis: [null],
        isActive: [null]
      });
    }

    else {
      this.PostJobForm = this.formBuilder.group({
        jobTitle: this.formData.jobType,
        jobType: this.formData.jobType,
        jobDescription: this.formBuilder.group({
          jobLocation: this.formData.jobDescription.jobLocation,
          jobProfile: this.formData.jobDescription.jobProfile,
          minQualification: this.formData.jobDescription.minQualification,
          minExperience: this.formData.jobDescription.minExperience,
          packageOffered: this.formData.jobDescription.packageOffered
        }),
        responsibilities: this.formData.responsibilities,
        lastDayToApply: this.formData.lastDayToApply,
        creationDate: this.formData.creationDate,
        creationDateMillis: this.formData.creationDateMillis,
        isActive: this.formData.isActive
      });
    }

  }

  onSubmit() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.PostJobForm.invalid) {
      return;
    }

    this.PostJobForm.value.isActive = true;
    this.PostJobForm.value.creationDateMillis = Date.now();
    this.PostJobForm.value.creationDate = new Date().toJSON().slice(0, 10);
    this.PostJobForm.value.lastDayToApply = this.PostJobForm.value.lastDayToApply + " 23:59:59";
    this.PostJobForm.value.lastDayToApply = Date.parse(this.PostJobForm.value.lastDayToApply);

    console.log(this.PostJobForm.value);

    if (this.formData == undefined) {
      this.dps.addJob(JSON.stringify(this.PostJobForm.value))
        .subscribe((data) => {
          console.log(data);
          this.PostJobForm.reset();
          this.posted = true;
        });
    }
    else {
      this.dps.updateJob(this.formData._id, this.PostJobForm.value)
        .subscribe((data) => {
          console.log(data);
          if (data.msg.nModified != 0) {
            this.PostJobForm.reset();
            this.posted = true;
          }
          else {
            alert("something went wrong");
          }

        })
    }
  }

  goBack() {
    this.submitted = false;
    this.posted = false;
  }

}
