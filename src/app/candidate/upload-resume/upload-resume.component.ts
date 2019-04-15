import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { DataProviderService } from 'src/app/data-provider.service';
import { Router } from '@angular/router';
import { ToastrManager, Toastr } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.css']
})
export class UploadResumeComponent implements OnInit {

  candidateForm: FormGroup;
  years = new Array();
  boards = ['CBSE', 'ICSE BOARDS', 'IB BOARDS', 'STATE BOARD'];
  streams = new Array();
  streamList = [

    ['Anthropology',
      'Archaeology',
      'Education',
      'Economics',
      'English',
      'French',
      'Geography',
      'German',
      'Hindi',
      'History',
      'Library Science',
      'Literature',
      'Mathematics',
      'Philosophy',
      'Political Science',
      'Public Administration',
      'Psychology',
      'Sanskrit',
      'Sociology'],
    [

      'Computer Graphics',
      'Programming Languages',
      'Database Management',
      'Systems Analysis',
      'Word Processing',
      'Internet Technologies',
      'Accounting Applications',
      'Animation',
      'Music and Video Processing',
      'Personal Information Management'

    ],
    [
      'Civil Engineering',
      'Electronics & Communication Engineering',
      'Mechanical Engineering',
      'Computer Science Engineering',
      'Information Technology',
      'Electrical Engineering',
      'Electronics & Instrumentation Engineering',
      'Electrical & Electronics Engineering',
      'Environmental Engineering',
      'Automobile Engineering',
      'Chemical Engineering',
      'Aeronautical Engineering'
    ],
    
    [
      'Civil Engineering',
      'Electronics & Communication Engineering',
      'Mechanical Engineering',
      'Computer Science Engineering',
      'Information Technology',
      'Electrical Engineering',
      'Electronics & Instrumentation Engineering',
      'Electrical & Electronics Engineering',
      'Environmental Engineering',
      'Automobile Engineering',
      'Chemical Engineering',
      'Aeronautical Engineering'
    ],
    [

      'Biology',
      'Biochemistry',
      'Botany',
      'Chemistry',
      'Computer Science',
      'Electronics',
      'Environmental Science',
      'Mathematics',
      'Physics',
      'Zoology',
    ],
    [
      'Accountancy',
      'Cost Account',
      'Statistics',
      'Management',
      'Human Resource',
      'Computer',
      'Economics',
      'English',
      'Law',
      'Marketing',
      'Finance',
    ]
  ];
  
  currCity: String;
  submitted: Boolean = false;
  perCity: String;
  currState: String;
  perState: String;
  otpValue: Number;
  sameAsCurAdd: Boolean = false;
  noWorkEx: Boolean = false;
  otpForm: Boolean = false;
  otpError: Boolean = false;
  _id: String;
  educationFields: any;
  skillFields: any;

  courses = ['B.A.', 'B.C.A', 'B.E.', 'B.Tech', 'B.Sc', 'B.Com'];

  formGroup = this.formBuilder.group({
    defaultResumeLink: new FormControl(),
    defaultVideoLink: new FormControl()
  });

  constructor(private formBuilder: FormBuilder, private dps: DataProviderService, private router: Router, private toast: ToastrManager) { }


  f() {
    return {
      basicInfo: this.candidateForm.controls['basicInfo'],
      highschool: this.candidateForm.controls['educationalQualification']['controls']['highschool'],
      intermediate: this.candidateForm.controls['educationalQualification']['controls']['intermediate'],
      graduation: this.candidateForm.controls['educationalQualification']['controls']['graduation'],
      others: this.candidateForm.controls['educationalQualification']['controls']['others'],
      currentAddress: this.candidateForm.controls['residentialDetails.currentAddress']
    }
  }

  changeStream(course) {
    
    for(var i=0;i<this.courses.length;i++){
      if(this.courses[i]===course){
        this.streams = this.streamList[i];
        break;
      }      
    }
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

  verifyOTP() {
    this.dps.verifyOtp(this.otpValue, this._id)
      .subscribe((data) => {
        console.log(data);
        if (data.verified) {
          this.toast.successToastr('OTP Verified', 'Success!')
          this.router.navigate(['/login'])
        }
        else {
          this.toast.errorToastr('Wrong Otp Entered', 'OTP Error')
          this.otpError = true;
        }

      })

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

  workExperienceChange() {
    this.noWorkEx = this.candidateForm.get('workExperience.exists').value;

  }

  ngOnInit() {

    for (var i = 0; i < 25; i++) {
      this.years.push(2019 - i);
    }

    this.candidateForm = this.formBuilder.group({
      basicInfo: this.formBuilder.group({
        candidateName: [null, [Validators.required, Validators.pattern('^[a-zA-Z, ]+$')]],
        candidateEmail: [null, [Validators.required, Validators.pattern(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/)]],
        password: [null, [Validators.required, Validators.minLength(8)]],//,Validators.pattern("^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$")]],
        mobileNumber: [null, [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
        cnfPassword: [null, [Validators.required, this.checkPassword]],
        gender: [null, [Validators.required]],
        age: [null, [Validators.required, this.ageValidator]],
      }),
      educationalQualification: this.formBuilder.group({
        highschool: this.formBuilder.group({
          institute: [null, [Validators.required]],
          passingYear: [null, [Validators.required]],
          board: [null, [Validators.required]],
          percentage: [null, [Validators.required, this.percentageValidator]],
          remark: [null]
        }),
        intermediate: this.formBuilder.group({
          institute: [null, [Validators.required]],
          passingYear: [null, [Validators.required, this.checkInterYear]],
          board: [null, [Validators.required]],
          percentage: [null, [Validators.required, this.percentageValidator]],
          remark: [null]
        }),
        graduation: this.formBuilder.group({
          course: [null, [Validators.required]],
          stream: [null, [Validators.required]],
          institute: [null, [Validators.required]],
          passingYear: [null, [Validators.required, this.checkGradYear]],
          university: [null, [Validators.required]],
          percentage: [null, [Validators.required, this.percentageValidator]],
          remark: [null]
        }),
        others: this.formBuilder.array([this.createEducationFields()])
      }),
      residentialDetails: this.formBuilder.group({
        currentAddress: this.formBuilder.group({
          addLine1: [null, [Validators.required]],
          addLine2: [null, [Validators.required]],
          city: [null, [Validators.required]],
          state: [null, [Validators.required]],
          pincode: [null, [Validators.required]]
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
      skillset: this.formBuilder.array([this.createSkillFields()]),
      uploadDocuments: this.formBuilder.group({
        resumeFile: [null],
        videoResumeFile: [null]
      }),
      referralDetails: this.formBuilder.group({
        name: [null],
        phoneNumber: [null],
        email: [null],
        designation: [null]
      })
    })
  }

  onSubmit() {
    console.log(this.candidateForm);


    this.submitted = true;

    if (this.candidateForm.invalid) {
      alert('please fill are required fields');
      return;
    }

    if (this.candidateForm.value.basicInfo.password != this.candidateForm.value.basicInfo.cnfPassword) {
      alert('Password not matched');
      this.candidateForm.value.cnfPassword.focus();

      return;
    }

    this.candidateForm.value.basicInfo.candidateEmail = this.candidateForm.value.basicInfo.candidateEmail.toLowerCase();

    this.dps.addCandidate(this.candidateForm.value)
      .subscribe((data) => {
        console.log(data);
        this.otpForm = data.saved;
        this._id = data.msg1._id;
      })
  }

  uploadResume($event) {
    if ($event.target.files.length > 0) {
      this.formGroup.get('defaultResumeLink').setValue($event.target.files[0]);
      this.formGroup.get('defaultResumeLink').updateValueAndValidity();

    }
  }

  uploadVideoResume($event) {
    if ($event.target.files.length > 0) {
      this.formGroup.get('defaultVideoLink').setValue($event.target.files[0]);
      this.formGroup.get('defaultVideoLink').updateValueAndValidity();

    }
  }

  submitDocuments() {

    const formData = new FormData();
    formData.append(
      'defaultResumeLink', this.formGroup.get('defaultResumeLink').value
    );
    formData.append(
      'defaultVideoLink', this.formGroup.get('defaultVideoLink').value
    );

    console.log('form data', formData);


    this.dps.uploadResumeFile(formData)
      .subscribe((data) => {
        console.log(data);
        this.toast.successToastr('uploaded files successfully','Success');
        this.candidateForm.value.uploadDocuments.resumeFile = data.resumePath
        this.candidateForm.value.uploadDocuments.videoResumeFile = data.videoPath


      })
  }

  checkInterYear(control: AbstractControl) {

    if (control.value != null) {
      if (!(control.value - 2 >= control.parent.parent.controls['highschool'].controls.passingYear.value)) {
        return {
          yearErr: {
            err: 'Year error! Please try again'
          }
        }
      }
    }
  }

  checkGradYear(control: AbstractControl) {

    if (control.value != null) {
      if (!(control.value - 3 >= control.parent.parent.controls['intermediate'].controls.passingYear.value)) {
        return {
          yearErr: {
            err: 'Year error! Please try again'
          }
        }
      }
    }
  }

  checkPassword(control: AbstractControl) {
    var val = control;

    if (control.parent != undefined) {
      if (val.parent.controls['password'].value !== control.value) {
        return {
          checkPassword: {
            value: control.value,
            pwd: control.parent.controls['password'].value

          }
        }
      }
      return null;
    }
  }
  ageValidator(control: AbstractControl) {
    if (control.value != null) {
      if (control.value < 18 || control.value > 65) {
        return {
          ageError: {
            value: control.value,
            err: 'invalid age'
          }
        }
      }
    }
    return null;
  }

  percentageValidator(control: AbstractControl) {
    if (control.value != null) {
      if (isNaN(control.value) || control.value < 0 || control.value > 100) {
        return {
          perErr: {
            err: 'invalid percentage'
          }
        }
      }
    }
  }
  createSkillFields(): FormGroup {
    return this.formBuilder.group({
      skillSetName: [null],
      skillLevel: [null]
    })
  }

  createEducationFields(): FormGroup {
    return this.formBuilder.group({
      course: [null],
      stream: [null],
      institute: [null],
      passingYear: [null],
      university: [null],
      percentage: [null, [this.percentageValidator]],
      remark: [null]

    })
  }

  addSkillField(): void {

    this.skillFields = this.candidateForm.get('skillset') as FormArray;
    this.skillFields.push(this.createSkillFields());
  }

  addEducationalField(): void {

    this.educationFields = this.candidateForm.get('educationalQualification.others') as FormArray;
    this.educationFields.push(this.createEducationFields());

  }
  removeSkillField(index) {
    this.skillFields.removeAt(index);
  }
  removeEducationField(index) {
    console.log(index);
    this.educationFields.removeAt(index);
  }
}
