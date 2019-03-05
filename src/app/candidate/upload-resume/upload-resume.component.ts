import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataProviderService } from 'src/app/data-provider.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.css']
})
export class UploadResumeComponent implements OnInit {

  candidateForm: FormGroup;
  years = new Array();
  boards = ['CBSE','ICSE BOARDS', 'IB BOARDS','STATE BOARD'];
  streams = [];
  currCity: String;
  submitted:Boolean =false;
  perCity: String;
  currState: String;
  perState: String;
  sameAsCurAdd: Boolean = false;
  noWorkEx : Boolean = false;

  courses = [
    {
      name: 'BTECH',
      streams: ['Computer Science',
        'Electronics and Communication Engineering',
        'Mechanical Engineering',
        'Computer Science and Engineering',
        'Civil Engineering']
    },
    {
      name: 'MBA',
      streams: [
        "Operations",
        "Systems",
        "Finance",
        "Marketing",
        "Retail",
        "International Business",
        "Entrepreneurship",
        "Sports Celebrty marketing",
        "Media relations and Advertising",
        "Human resources",
        "Business deisgn",
      ]
    }];

    formGroup=this.formBuilder.group({
      defaultResumeLink: new FormControl(),
      defaultVideoLink:new FormControl()
    });

  constructor(private formBuilder: FormBuilder, private dps: DataProviderService,private router:Router) { }

  f(){
    console.log('ctrls',this.candidateForm.controls);
    
    return this.candidateForm.controls;
  }

  changeStream(course) {
    this.candidateForm.value.educationalQualification.graduation.course=JSON.parse(course).name;
    this.streams = JSON.parse(course).streams;

  }

  onKey(event) {
    if (('' + event).length == 6) {
      // call methods
      this.dps.getCityState(event)
        .subscribe((data) => {
          if (data.Status === "Success") {

            this.candidateForm.get('residentialDetails.currentAddress.city').setValue(data.data.city);
            this.candidateForm.get('residentialDetails.currentAddress.state').setValue(data.data.state);


          }
          else if (data.Status === "Error") {
            this.candidateForm.get('residentialDetails.currentAddress.city').setValue(null);
            this.candidateForm.get('residentialDetails.currentAddress.state').setValue(null);

          }
          else {
            console.log('something else');

          }
        })

    }
    else {
      this.candidateForm.get('residentialDetails.currentAddress.city').setValue(null);
      this.candidateForm.get('residentialDetails.currentAddress.state').setValue(null);


    }

  }

  onKey2(event) {
    if (('' + event).length == 6) {
      // call methods
      this.dps.getCityState(event)
        .subscribe((data) => {
          if (data.Status === "Success") {
            this.candidateForm.get('residentialDetails.permanentAddress.city').setValue(data.data.city);
            this.candidateForm.get('residentialDetails.permanentAddress.state').setValue(data.data.state);


          }
          else if (data.Status === "Error") {
            this.candidateForm.get('residentialDetails.permanentAddress.city').setValue(null);
            this.candidateForm.get('residentialDetails.permanentAddress.state').setValue(null);

          }
          else {
            console.log('something else');

          }
        })

    }
    else {
      
      this.candidateForm.get('residentialDetails.permanentAddress.city').setValue(null);
      this.candidateForm.get('residentialDetails.permanentAddress.state').setValue(null);


    }

  }

  workExperienceChange(){
    this.noWorkEx=this.candidateForm.get('workExperience.exists').value;
    
  }

  ngOnInit() {

    for(var i=0;i<25;i++){
      this.years.push(2019-i);
    }

    this.candidateForm = this.formBuilder.group({
      basicInfo: this.formBuilder.group({
        candidateName: [null,[Validators.required]],
        candidateEmail: [null,[Validators.required]],
        password: [null,[Validators.required]],
        mobileNumber:[null,[Validators.required]],
        cnfPassword: [null,[Validators.required]],
        gender: [null,[Validators.required]],
        age: [null,[Validators.required]],
      }),
      educationalQualification: this.formBuilder.group({
        highschool: this.formBuilder.group({
          institute: [null,[Validators.required]],
          passingYear: [null,[Validators.required]],
          board: [null,[Validators.required]],
          percentage: [null,[Validators.required]],
          remark: [null]
        }),
        intermediate: this.formBuilder.group({
          institute: [null,[Validators.required]],
          passingYear: [null,[Validators.required]],
          board: [null,[Validators.required]],
          percentage: [null,[Validators.required]],
          remark: [null]
        }),
        graduation: this.formBuilder.group({
          course: [null,[Validators.required]],
          stream: [null,[Validators.required]],
          institute: [null,[Validators.required]],
          passingYear: [null,[Validators.required]],
          university: [null,[Validators.required]],
          percentage: [null,[Validators.required]],
          remark: [null]
        }),
      }),
      residentialDetails: this.formBuilder.group({
        currentAddress: this.formBuilder.group({
          addLine1: [null,[Validators.required]],
          addLine2: [null,[Validators.required]],
          city: [null,[Validators.required]],
          state: [null,[Validators.required]],
          pincode: [null,[Validators.required]]
        }),
        permanentAddress: this.formBuilder.group({
          isSameAsCurrentAddress: Boolean,
          addLine1: [null],
          addLine2: [null],
          city: [null],
          state: [null],
          pincode: [null]
        })
      }),
      workExperience: this.formBuilder.group({
        exists: [null],
        currentJobStatus: [null],
        startDate: Date,
        endDate: [null],
        jobProfile: [null],
        companyName: [null],
        jobLocation: this.formBuilder.group({
          city: [null],
          state: [null],
          country: [null]
        }),
        description: [null]
      }),
      skillset: this.formBuilder.group({
        skillSetName: [null],
        skillLevel: [null]
      }),
      referralDetails: this.formBuilder.group({
        name: [null],
        phoneNumber: [null],
        email: [null],
        designation: [null]
      })
    })
  }

  onSubmit(val){
    
    this.submitted = true;

    if(this.candidateForm.invalid){
      alert('please fill are required fields');
      return;
    }

    if(this.candidateForm.value.basicInfo.password != this.candidateForm.value.basicInfo.cnfPassword){
      alert('Password not matched');
      this.candidateForm.value.cnfPassword.focus();
      
      return;
    }

    this.candidateForm.value.basicInfo.candidateEmail = this.candidateForm.value.basicInfo.candidateEmail.toLowerCase();
    
    this.dps.addCandidate(this.candidateForm.value)
    .subscribe((data)=>{
      console.log(data);
    })
  }

  uploadResume($event){
    if($event.target.files.length>0){
      this.formGroup.get('defaultResumeLink').setValue($event.target.files[0]);
      this.formGroup.get('defaultResumeLink').updateValueAndValidity();
      
    }
  }

  uploadVideoResume($event){
    if($event.target.files.length>0){
      this.formGroup.get('defaultVideoLink').setValue($event.target.files[0]);
      this.formGroup.get('defaultVideoLink').updateValueAndValidity();
      
    }
  }

  submitDocuments(){

    let candidateProfile = this.formGroup.value;

    const formData = new FormData();
    formData.append(
      'defaultResumeLink',this.formGroup.get('defaultResumeLink').value
    );
    formData.append(
      'defaultVideoLink',this.formGroup.get('defaultVideoLink').value
    );
    
    this.dps.uploadResumeFile(formData)
    .subscribe((data)=>{
      console.log(data);

      if(data.saved){
        this.router.navigate(['/login']);
      }
      
    })
  }
}
