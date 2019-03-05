import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProviderService } from '../data-provider.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error: Boolean;
  schedule: any;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dps: DataProviderService,
  ){}

  ngOnInit() {

    this.token = localStorage.getItem('token');
    if (this.token != null) {
      console.log('local token',this.token);
      
      this.dps.decodeToken(this.token)
        .subscribe((val) => {
          if (val.login) {

            if (val.role === 'candidate') {
              this.dps.getCandidateById(val._id).subscribe((candidateData) => {
                console.log(candidateData);
                this.router.navigate(['candidate-dashboard'], { state: candidateData });
              })
            }
            else if (val.role === 'interviewer') {
              this.dps.getInterviewerById(val._id).subscribe((interviewerData) => {
                console.log(interviewerData);
              this.router.navigate(['interviewer-panel'],{state : interviewerData});
              })
            }
            else if (val.role === 'admin') {
              this.dps.getAdminById(val._id).subscribe((adminData) => {
              console.log(adminData);
            
              this.router.navigate(['default-admin'],{state : adminData});
              })

            }
          }
          else {
            this.error = true;
          }
        })

    }

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.dps.login(this.loginForm.value)
      .subscribe((data) => {

        localStorage.setItem('token', data.token);

        // decode token         
        this.dps.decodeToken(data.token)
          .subscribe((val) => {
            if (val.login) {

              if (val.role === 'candidate') {
                localStorage.setItem('candidate_id',val._id);
                this.dps.getCandidateById(val._id).subscribe((candidateData) => {
                  console.log(candidateData);
                  this.router.navigate(['candidate-dashboard'], { state: candidateData });
                })
              }
              else if (val.role === 'interviewer') {
                localStorage.setItem('interviewer_id',val._id);
                this.dps.getInterviewerById(val._id)
                .subscribe((interviewerData)=>{
                  console.log(interviewerData);
                  this.router.navigate(['interviewer-panel'], { state: interviewerData });
                  
                })
              }
              else if (val.role === 'admin') {
                localStorage.setItem('admin_id',val._id);
                this.dps.getAdminById(val._id)
                .subscribe((adminData)=>{
                  console.log(adminData);
                  this.router.navigate(['default-admin'], { state: data.admin });                  
                })

              }
            }
            else {
              this.error = true;
            }
          })

        // route acc to role



      })
    this.error = true;
  }
}