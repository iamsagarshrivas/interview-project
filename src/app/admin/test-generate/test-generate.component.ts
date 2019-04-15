import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataProviderService } from 'src/app/data-provider.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-test-generate',
  templateUrl: './test-generate.component.html',
  styleUrls: ['./test-generate.component.css']
})
export class TestGenerateComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private dps:DataProviderService,
    private toast:ToastrManager) {
   }

  TestGeneratorForm:FormGroup;
  tests=new Array();
  modalData:any;
  modalDetails:any ;
  totalMarks:number=0;
  easyCount:number=0;
  mediumCount:number=0;
  hardCount:number=0;
  // formValid:Boolean=false;

  ngOnInit() {
    this.TestGeneratorForm =this.formBuilder.group({
      easy:[0,[Validators.min(0),Validators.required]],
      medium:[0,[Validators.min(0),Validators.required]],
      hard:[0,[Validators.min(0),Validators.required]]
    });

    this.onChanges();

    this.getTests();
    this.getNumOfQues();
  }

  getNumOfQues(){
    this.dps.getNumOfQues()
    .subscribe(data=>{
      this.easyCount = data.easy;
      this.mediumCount = data.medium;
      this.hardCount = data.hard;

      this.TestGeneratorForm.get('easy').setValidators([Validators.max(this.easyCount),Validators.min(0),]);
      this.TestGeneratorForm.get('medium').setValidators([Validators.max(this.mediumCount),Validators.min(0),]);
      this.TestGeneratorForm.get('hard').setValidators([Validators.max(this.hardCount),Validators.min(0),]);
      
      
    })
  }

  onChanges():void{
    this.TestGeneratorForm.valueChanges.subscribe(val=>{
      this.totalMarks = 1*val.easy + 2* val.medium + 5*val.hard; 
      
    })
  }

  getTests(){
    this.dps.getAllTests()
    .subscribe((data)=>{
      console.log(data);
      
      this.tests=data.tests;
      this.modalDetails = this.tests[0];
      console.log('mmm',this.modalData);
      
    })
  }

  onSubmit(){
    console.log(this.TestGeneratorForm.value)
    this.dps.generateTest(this.TestGeneratorForm.value)
    .subscribe((data)=>{
      console.log(data);
      if(data.generated){
        this.toast.successToastr('Test created successfully','Test Created');
        this.tests.push(data.savedTest);
        this.TestGeneratorForm.reset()   
      }
      else{
        this.toast.errorToastr(data.err,'Error')
      }
      
    })
  }

  getTestQuestions(test){
    this.dps.getTestQues(test._id)
    .subscribe((data)=>{
      this.modalData = data.questionList; 
      this.modalDetails = test;

      console.log(this.modalData);
      
           
    })  

  }
}
