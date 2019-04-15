import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProviderService } from '../data-provider.service';
import { HttpClient } from '@angular/common/http';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

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
  otpValue:string;
  otpError:boolean=false;
  errorMsg:string;
  _id:string;

  constructor(
    private socialAuthService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dps: DataProviderService,
  ){}

  ngOnInit() {

    // this.token = localStorage.getItem('token');
    // if (this.token != null) {
    //   console.log('local token',this.token);
      
    //   this.dps.decodeToken(this.token)
    //     .subscribe((val) => {
    //       if (val.login) {

    //         if (val.role === 'candidate') {
    //           this.dps.getCandidateById(val._id).subscribe((candidateData) => {
    //             console.log(candidateData);
    //             this.router.navigate(['candidate-dashboard'], { state: candidateData });
    //           })
    //         }

    //         else if (val.role === 'interviewer') {
    //           this.dps.getInterviewerById(val._id).subscribe((interviewerData) => {
    //             console.log(interviewerData);
    //           this.router.navigate(['interviewer-panel'],{state : interviewerData});
    //           })
    //         }
    //         else if (val.role === 'admin') {
    //           this.dps.getInterviewerById(val._id).subscribe((adminData) => {
                          
    //           this.router.navigate(['default-admin'],{state : adminData});
    //           })

    //         }
    //       }
    //       else {
    //         this.error = !val.login;
    //         this.errorMsg = 'invalid email or password';
    //       }
    //     })

    // }

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

  }

  verifyOTP(){
    this.dps.verifyOtp(this.otpValue,this._id)
    .subscribe((data)=>{
      console.log(data);
      if(data.verified){
        this.router.navigate(['/login'])
      }
      else{
        this.otpError = true;
      }
      
    })
    
  }
  socialSignIn(socialPlatform:string){
    console.log(`${socialPlatform} sign in`);

    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      console.log('facebook');
      
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        
        this.dps.socialLogin(userData)
        .subscribe((data)=>{
          console.log("data",data);
          if(!data.newUser){
            console.log('kjhgfds');
            

              this.dps.decodeToken(data.token)
              .subscribe((decodedData)=>{
                console.log(decodedData);
                
              })
              

              // if (data.userUpdated.role === 'candidate') {
              //   //localStorage.setItem('candidate_id',val._id);
              //   this.dps.getCandidateById(data.userUpdated._id).subscribe((candidateData) => {
              //     console.log(candidateData);
              //     this.router.navigate(['candidate-dashboard'], { state: candidateData });
              //   })
              // }
              // else if (data.userUpdated.role === 'interviewer') {
              //   //localStorage.setItem('interviewer_id',val._id);
              //   this.dps.getInterviewerById(data.userUpdated._id)
              //   .subscribe((interviewerData)=>{
              //     console.log(interviewerData);
              //     this.router.navigate(['interviewer-panel'], { state: interviewerData });
                  
              //   })
              // }
              // else if (data.userUpdated.role === 'admin') {
              //   //localStorage.setItem('admin_id',val._id);
              //   this.dps.getInterviewerById(data.userUpdated._id)
              //   .subscribe((adminData)=>{
              //     console.log(adminData);
              //     this.router.navigate(['default-admin'], { state: adminData });                  
              //   })

              // }
              // else{
              //   this.error =true;
              //   this.errorMsg = 'no user found';
              // }

        }
        })
            
      }
    )    
    
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.error = true;
      this.errorMsg = 'please enter your email and password.'
      return;
    }

    this.dps.login(this.loginForm.value)
      .subscribe((data) => {

        if(data.token!==null && data.token!== undefined){
          localStorage.setItem('token', data.token);
        }
        else{
          this.error =true;
          this.errorMsg = 'no user found'
          return;
        }

        // decode token         
        this.dps.decodeToken(data.token)
          .subscribe((val) => {
            
            console.log(val);
            
            if (val.login) {

              if (val.role === 'candidate') {
                //localStorage.setItem('candidate_id',val._id);
                this.dps.getCandidateById(val._id).subscribe((candidateData) => {
                  console.log(candidateData);
                  this.router.navigate(['candidate-dashboard'], { state: candidateData });
                })
              }
              else if (val.role === 'interviewer') {
                //localStorage.setItem('interviewer_id',val._id);
                this.dps.getInterviewerById(val._id)
                .subscribe((interviewerData)=>{
                  console.log(interviewerData);
                  this.router.navigate(['interviewer-panel'], { state: interviewerData });
                  
                })
              }
              else if (val.role === 'admin') {
                //localStorage.setItem('admin_id',val._id);
                this.dps.getInterviewerById(val._id)
                .subscribe((adminData)=>{
                  console.log(adminData);
                  this.router.navigate(['default-admin'], { state: adminData });                  
                })

              }
              else{
                this.error =true;
                this.errorMsg = 'no user found';
              }
            }
            else {
              this.error = true;
              this.errorMsg = 'no user found';
            }
          })

        // route acc to role



      })
  }
}