import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DataProviderService } from 'src/app/data-provider.service';

@Component({
  selector: 'app-add-ques',
  templateUrl: './add-ques.component.html',
  styleUrls: ['./add-ques.component.css']
})
export class AddQuesComponent implements OnInit {

  posted:Boolean=false;
  AddQuesForm:FormGroup;
  questions:FormArray;
  options:FormArray;
  levels:any=["easy","medium","hard"];

  constructor(private formBuilder:FormBuilder,private dps:DataProviderService) { }

  ngOnInit() {
    this.AddQuesForm = this.formBuilder.group({
      quesDescription:this.formBuilder.array([this.createQuestion()])
    })
  }

  onSubmit(){
    
    console.log(this.AddQuesForm.value);
    this.dps.addQuestions(this.AddQuesForm.value)
    .subscribe((data)=>{
      console.log(data);
      if(data["success"]){
        this.AddQuesForm.reset();
        this.posted=true;
      }      
    })  
  }
  goBack(){
    this.posted=false;
    this.ngOnInit();
  }

  createQuestion(){
    console.log('creat qs');
    
    return this.formBuilder.group({
      ques:[null,Validators.required],
      answer:[null,Validators.required],
      level:[null,Validators.required],
      options:this.formBuilder.array([this.createOption()])
    })
  }

  addQuestion(){
    console.log('add qs');
    
    this.questions = this.AddQuesForm.get('quesDescription') as FormArray;
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index){
    console.log('rm qs');
    
    this.questions = this.AddQuesForm.get('quesDescription') as FormArray;
    this.questions.removeAt(index)
  }

  createOption(){
    console.log('cr op');
    
    return this.formBuilder.control([null]);
  }

  addOption(index){
    
    console.log('add op',this.options,index);
    this.options = this.AddQuesForm.get('quesDescription')['controls'][index].get('options') as FormArray;

    this.options.push(this.createOption());
  }

  removeOption(index_i,index_j){

    console.log('rm op');
    
    this.options = this.AddQuesForm.get('quesDescription')['controls'][index_i].get('options') as FormArray;
    this.options.removeAt(index_j);

  }

}
